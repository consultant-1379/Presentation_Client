set version=
set filename=jscore%version%.js

echo /** > %filename%
echo * JSCore %version% >> %filename%
echo */ >> %filename%

type top.js >> %filename%

type jquery.js >> %filename%
type require.js >> %filename%
type text.js >> %filename%
type underscore.js >> %filename%
type backbone.js >> %filename%

type core\App.js >> %filename%
type core\Region.js >> %filename%
type core\Widget.js >> %filename%

type ext\klass.js >> %filename%
type ext\EventBus.js >> %filename%
type ext\URLController.js >> %filename%
type ext\css.js >> %filename%
type ext\dom.js >> %filename%
type ext\utils.js >> %filename%

type ext\mvp\Model.js >> %filename%
type ext\mvp\View.js >> %filename%

type core\Facade.js >> %filename%

type bottom.js >> %filename%
