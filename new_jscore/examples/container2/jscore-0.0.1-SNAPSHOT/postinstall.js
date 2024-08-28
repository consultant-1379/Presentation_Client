#!/usr/bin/env node
/*global console, require, __dirname */
console.log('Running postinstall script to move jscore in to destination foder');

var fs = require('fs'),
    path = require('path');
//rimraf
// for EMFILE handling
var timeout = 0
exports.EMFILE_MAX = 1000
exports.BUSYTRIES_MAX = 3

function rimraf (p, cb) {
    if (!cb) throw new Error("No callback passed to rimraf()")

    var busyTries = 0
    rimraf_(p, function CB (er) {
        if (er) {
            if (er.code === "EBUSY" && busyTries < exports.BUSYTRIES_MAX) {
                busyTries ++
                var time = busyTries * 100
                // try again, with the same exact callback as this one.
                return setTimeout(function () {
                    rimraf_(p, CB)
                }, time)
            }

            // this one won't happen if graceful-fs is used.
            if (er.code === "EMFILE" && timeout < exports.EMFILE_MAX) {
                return setTimeout(function () {
                    rimraf_(p, CB)
                }, timeout ++)
            }

            // already gone
            if (er.code === "ENOENT") er = null
        }

        timeout = 0
        cb(er)
    })
}

// Two possible strategies.
// 1. Assume it's a file.  unlink it, then do the dir stuff on EPERM or EISDIR
// 2. Assume it's a directory.  readdir, then do the file stuff on ENOTDIR
//
// Both result in an extra syscall when you guess wrong.  However, there
// are likely far more normal files in the world than directories.  This
// is based on the assumption that a the average number of files per
// directory is >= 1.
//
// If anyone ever complains about this, then I guess the strategy could
// be made configurable somehow.  But until then, YAGNI.
function rimraf_ (p, cb) {
    fs.unlink(p, function (er) {
        if (er && er.code === "ENOENT")
            return cb()
        if (er && (er.code === "EPERM" || er.code === "EISDIR"))
            return rmdir(p, er, cb)
        return cb(er)
    })
}

function rmdir (p, originalEr, cb) {
    // try to rmdir first, and only readdir on ENOTEMPTY or EEXIST (SunOS)
    // if we guessed wrong, and it's not a directory, then
    // raise the original error.
    fs.rmdir(p, function (er) {
        if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST"))
            rmkids(p, cb);
        else if (er && er.code === "ENOTDIR")
            cb(originalEr);
        else
            cb(er);
    })
}

function rmkids(p, cb) {
    fs.readdir(p, function (er, files) {
        if (er)
            return cb(er)
        var n = files.length
        if (n === 0)
            return fs.rmdir(p, cb)
        var errState
        files.forEach(function (f) {
            rimraf(path.join(p, f), function (er) {
                if (errState)
                    return
                if (er)
                    return cb(errState = er)
                if (--n === 0)
                    fs.rmdir(p, cb)
            })
        })
    })
}

// this looks simpler, and is strictly *faster*, but will
// tie up the JavaScript thread and fail on excessively
// deep directory trees.
function rimrafSync (p) {
    try {
        fs.unlinkSync(p);
    } catch (er) {
        if (er.code === "ENOENT")
            return
        if (er.code !== "EPERM" && er.code !== "EISDIR")
            throw er
        try {
            fs.rmdirSync(p)
        } catch (er2) {
            if (er2.code === "ENOENT")
                return
            if (er2.code === "ENOTDIR")
                throw er
            if (er2.code === "ENOTEMPTY") {
                fs.readdirSync(p).forEach(function (f) {
                    rimrafSync(path.join(p, f))
                })
                fs.rmdirSync(p)
            }
        }
    }
}
//NCP
function ncp(source, dest, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    }

    var basePath = process.cwd(),
        currentPath = path.resolve(basePath, source),
        targetPath = path.resolve(basePath, dest),
        filter = options.filter,
        filterdir = options.filterdir,
        transform = options.transform,
        clobber = options.clobber !== false,
        errs = null,
        started = 0,
        finished = 0,
        running = 0,
        limit = options.limit || ncp.limit || 16;

    limit = (limit < 1) ? 1 : (limit > 512) ? 512 : limit;

    startCopy(currentPath);

    function startCopy(source) {
        started++;
        if (filter) {
            if (filter instanceof RegExp) {
                if (!filter.test(source)) {
                    return cb(true);
                }
            }
            else if (typeof filter === 'function') {
                if (!filter(source)) {
                    return cb(true);
                }
            }
        }
        return getStats(source);
    }

    function defer(fn) {
        if (typeof(setImmediate) === 'function')
            return setImmediate(fn);
        return process.nextTick(fn);
    }

    function getStats(source) {
        if (running >= limit) {
            return defer(function () {
                getStats(source);
            });
        }
        running++;
        fs.lstat(source, function (err, stats) {
            var item = {};
            if (err) {
                return onError(err);
            }

            // We need to get the mode from the stats object and preserve it.
            item.name = source;
            item.mode = stats.mode;

            if (stats.isDirectory()) {
                return onDir(item);
            }
            else if (stats.isFile()) {
                return onFile(item);
            }
            else if (stats.isSymbolicLink()) {
                // Symlinks don't really need to know about the mode.
                return onLink(source);
            }
        });
    }

    function onFile(file) {
        var target = file.name.replace(currentPath, targetPath);
        isWritable(target, function (writable) {
            if (writable) {
                return copyFile(file, target);
            }
            if (clobber)
                rmFile(target, function () {
                    copyFile(file, target);
                });
        });
    }

    function copyFile(file, target) {
        var readStream = fs.createReadStream(file.name),
            writeStream = fs.createWriteStream(target, { mode: file.mode });
        if (transform) {
            transform(readStream, writeStream, file);
        } else {
            readStream.pipe(writeStream);
        }
        readStream.once('end', cb);
    }

    function rmFile(file, done) {
        fs.unlink(file, function (err) {
            if (err) {
                return onError(err);
            }
            return done();
        });
    }

    function onDir(dir) {
        var target = dir.name.replace(currentPath, targetPath);
        isWritable(target, function (writable) {
            if (writable) {
                return mkDir(dir, target);
            }

            copyDir(dir.name);

        });
    }

    function mkDir(dir, target) {
        fs.mkdir(target, dir.mode, function (err) {
            if (err) {
                return onError(err);
            }
            copyDir(dir.name);
        });
    }

    function copyDir(dir) {
        fs.readdir(dir, function (err, items) {
            if (err) {
                return onError(err);
            }
            items.forEach(function (item) {
                startCopy(dir + '/' + item);
            });
            return cb();
        });
    }

    function onLink(link) {
        var target = link.replace(currentPath, targetPath);
        fs.readlink(link, function (err, resolvedPath) {
            if (err) {
                return onError(err);
            }
            checkLink(resolvedPath, target);
        });
    }

    function checkLink(resolvedPath, target) {
        isWritable(target, function (writable) {
            if (writable) {
                return makeLink(resolvedPath, target);
            }
            fs.readlink(target, function (err, targetDest) {
                if (err) {
                    return onError(err);
                }
                if (targetDest === resolvedPath) {
                    return cb();
                }
                return rmFile(target, function () {
                    makeLink(resolvedPath, target);
                });
            });
        });
    }

    function makeLink(linkPath, target) {
        fs.symlink(linkPath, target, function (err) {
            if (err) {
                return onError(err);
            }
            return cb();
        });
    }

    function isWritable(path, done) {
        fs.lstat(path, function (err, stats) {
            if (err) {
                if (err.code === 'ENOENT') return done(true);
                return done(false);
            }
            return done(false);
        });
    }

    function onError(err) {
        if (options.stopOnError) {
            return callback(err);
        }
        else if (!errs && options.errs) {
            errs = fs.createWriteStream(options.errs);
        }
        else if (!errs) {
            errs = [];
        }
        if (typeof errs.write === 'undefined') {
            errs.push(err);
        }
        else {
            errs.write(err.stack + '\n\n');
        }
        return cb();
    }

    function cb(skipped) {
        if (!skipped) running--;
        finished++;
        if ((started === finished) && (running === 0)) {
            return errs ? callback(errs) : callback(null);
        }
    }
};

var pathToJscore = __dirname;
var destpPath = path.resolve(pathToJscore, '../jscore/');
fs.mkdir(destpPath, 0755, function () {
    fs.readdir(pathToJscore, function (err, files) {
        var filter = new RegExp('[0-9](\.)[0-9](\.)[0-9]'),
            jscore = false,
            require = false;

        files.forEach(function (file) {
            if (filter.test(file)) {

                ncp(pathToJscore + '/' + file, destpPath + '/' + file, function (err) {
                    if (!err) {
                        console.log('jscore version ' + file + ' is copied to node_modules/jscore/' + file + ' successfully.');
                        jscore = true;
                        if (jscore === true && require === true) {
                            whenFinished();
                        }

                    } else {

                        console.log(err);
                    }
                });
            } else if (file === 'require') {
                var requireIn = true;
                fs.readdir(destpPath, function (errin, filein) {
                    filein.forEach(function (fileuse) {
                        if (fileuse === 'require') {
                            require = true;
                            requireIn = false;
                        }
                    });

                    if (requireIn === true) {

                        ncp(pathToJscore + '/require', destpPath + '/require', function (err) {
                            if (!err) {
                                console.log(file + ' is copied to node_modules/jscore/' + file + ' successfully.');
                                require = true;
                                if (jscore === true && require === true) {
                                    whenFinished();
                                }
                            } else {

                                console.log(err);
                            }
                        });
                    }
                });
            }
        });

    });
});

function whenFinished() {
    console.log('Postinstall Script is finished Successfully!');

    /* rmdir(pathToJscore, 'iString', function(err){
        if(err){
                console.log(err);
        }else{

            console.log('Postinstall Script is finished Successfully!');
        }
    });   */


}

