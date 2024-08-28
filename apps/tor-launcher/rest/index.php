<?php

header('Cache-Control: no-cache');

require 'Slim/Slim.php';

function getRow($id) {
    return array(
        "id"=>$id,
        "column1"=> substr(strtolower(base64_encode(rand())), 2, 4)." Cell 1".$id,
        "column2"=> rand(1111,9999)." Cell 2".$id,
        "column3"=> substr(md5(rand()), 0, 4)." Cell 3".$id
    );
}

function getColumn($id, $title, $width) {
    return array(
        "id" => $id,
        "title" => $title,
        "width" => $width
    );
}

function getColumns1() {
    return array(
        getColumn("column1", "Column 1", "20%"),
        getColumn("column2", "Column 2", "20%"),
        getColumn("column3", "Column 3", "")
    );
}
function getColumns2() {
    return array(
        getColumn("column3", "Column 3", "20%"),
        getColumn("column2", "Column 2", "")
    );
}

function getGroup($id) {
    if ($id == "all") {
        $arr = array();
        for ($i = 1; $i <= 30; $i++) {
            $fav = false;
            if ($i == 1 || $i == 4 || $i == 25 || $i == 28) {
                $fav = true;
            }
            array_push($arr, array(
                "id" => "app" . $i,
                "label" => "Application " . $i,
                "favorite" => $fav
            ));
        }
        return array(
            "id" => "all",
            "label" => "All",
            "apps" => $arr
        );
    }
    else if ($id == "group1") {
        return array(
            "id" => "group1",
            "label" => "Group 1",
            "apps" => array(
                array(
                    "id" => "app1",
                    "label" => "Application 1",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
                ),
                array(
                    "id" => "app3",
                    "label" => "Application 3",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app6",
                    "label" => "Application 6",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app13",
                    "label" => "Application 13",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app18",
                    "label" => "Application 18",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app23",
                    "label" => "Application 23",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app26",
                    "label" => "Application 26",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
                ),
                array(
                    "id" => "app28",
                    "label" => "Application 28",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
                )
            )
        );
    } else if ($id == "group2") {
        return array(
            "id" => "group2",
            "label" => "Group 2",
            "apps" => array(
               array(
                   "id" => "app2",
                   "label" => "Application 2",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               ),
               array(
                   "id" => "app4",
                   "label" => "Application 4",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
               ),
               array(
                   "id" => "app15",
                   "label" => "Application 5",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               ),
               array(
                   "id" => "app18",
                   "label" => "Application 8",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               ),
               array(
                   "id" => "app10",
                   "label" => "Application 10",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               )
            )
        );
    } else if ($id == "group3") {
        return array(
           "id" => "group3",
           "label" => "Group 3",
           "apps" => array(
               array(
                   "id" => "app25",
                   "label" => "Application 25",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
               ),
               array(
                   "id" => "app31",
                   "label" => "Application 31",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => false
               )
           )
        );
    } else if ($id == "favorites") {
        return array(
            "id" => "favorites",
            "label" => "Favorites",
            "apps" => array(
                array(
                    "id" => "app1",
                    "label" => "Application 1",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
                ),
                array(
                    "id" => "app4",
                    "label" => "Application 4",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
                ),
                array(
                    "id" => "app25",
                    "label" => "Application 25",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
                ),
                array(
                    "id" => "app28",
                    "label" => "Application 28",
                    "tags" => array("tag1", "tag2", "tag3"),
                    "favorite" => true
                )
            )
        );
    }
}

$app = new Slim();
$app->get('/messages', function () {
    $rows = array();
    for ($i = 0; $i < 8; $i++) {
        array_push($rows,getRow($i));
    }
    echo json_encode($rows);
});
$app->post('/messages', function () {
    $json = json_decode(file_get_contents('php://input'), true);
    $json['id'] = rand(1000, 100000);
    echo json_encode($json);
});
$app->delete('/messages/:id', function ($id) {
    echo json_encode(array());
});
$app->put('/messages/:id', function ($id) {
    echo json_encode(array());
});
$app->get('/ui/settings/apps/app1/widgets/table1', function () {
    $columns = array(
        "columns" => getColumns1()
    );
    echo json_encode($columns);
});
$app->get('/ui/settings/apps/app1/widgets/table1/columns', function () {
    $columns = getColumns1();
    echo json_encode($columns);
});
$app->put('/ui/settings/apps/app1/widgets/table1', function () {
    echo json_encode(array());
});
$app->put('/ui/settings/apps/app2/widgets/table1', function () {
    echo json_encode(array());
});
$app->get('/ui/settings/apps/app2/widgets/table1', function () {
    $columns = array(
        "columns" => getColumns2()
    );
    echo json_encode($columns);
});
$app->get('/ui/settings/apps/app2/widgets/table1/columns', function () {
    $columns = getColumns2();
    echo json_encode($columns);
});

$app->get('/ui/settings/apps/launcher/widgets/launcher', function () {
    echo json_encode(array(
        "id" => "launcher",
        "favorites_group" => getGroup("favorites"),
        "favorites_ids" => array("app1", "app4", "app25", "app28")
    ));
});

$app->get('/ui/settings/favorites', function () {
    echo json_encode(array(
        "id" => "favorites",
        "favorites" => array("app1", "app4", "app25", "app28")
    ));
});

$app->put('/ui/settings/favorites', function () {
    echo json_encode(array());
});

$app->get('/groups/:id', function($id) {
    echo json_encode(getGroup($id));
});

$app->get('/groups/:id/apps', function($id) {
    $group = getGroup($id);
    echo json_encode($group["apps"]);
});


$app->get('/groups', function () {
    echo '[{"id":"fm","name":"Fault Management","apps":[{"id":"AlarmTextRouting","name":"Alarm Text Routing","favorite":false,"shortInfo":"Here goes some description for Alarm Text Routing","detail":null,"uri":"/rest/apps/AlarmTextRouting.ica","type":"CITRIX"},{"id":"AlarmLogBrowser","name":"Alarm Log Browser","favorite":false,"shortInfo":"Short info for Alarm Log Browser. Very long description","detail":null,"uri":"/rest/apps/AlarmLogBrowser.ica","type":"CITRIX"},{"id":"FMXEventSimulator","name":"FMX Event Simulator","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/FMXEventSimulator.ica","type":"CITRIX"},{"id":"FMXRuleEditor","name":"FMX Rule Editor","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/FMXRuleEditor.ica","type":"CITRIX"},{"id":"AlarmListViewer","name":"Alarm List Viewer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AlarmListViewer.ica","type":"CITRIX"},{"id":"AlarmStatusMatrix","name":"Alarm Status Matrix","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AlarmStatusMatrix.ica","type":"CITRIX"},{"id":"FMXModuleAdministration","name":"FMX Module Administration","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/FMXModuleAdministration.ica","type":"CITRIX"}]},{"id":"other","name":"Other","apps":[null,{"id":"EventBasedAppsCore","name":"Event Based Apps for Core","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EventBasedAppsCore.ica","type":"CITRIX"},{"id":"IMS_Trace","name":"IMS Trace","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IMS_Trace.ica","type":"CITRIX"},{"id":"ParameterCheck","name":"Parameter Check","favorite":false,"info":null,"detail":null,"uri":"http://atrcxb1640.athtem.eei.ericsson.se:8080/parametercheck/","type":"WEB"},{"id":"CoreNetworkStatusMonitor","name":"Core Network Status Monitor","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CoreNetworkStatusMonitor.ica","type":"CITRIX"},{"id":"LAT","name":"License Administration Tool","favorite":false,"info":null,"detail":null,"uri":"https://atrcxb1640.athtem.eei.ericsson.se:8181/lat-core-client","type":"WEB"},{"id":"CollectNELogs","name":"Collect NE Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CollectNELogs.ica","type":"CITRIX"},{"id":"IRATHOM","name":"IRATHOM","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IRATHOM.ica","type":"CITRIX"},{"id":"OSSExplorer","name":"OSS Explorer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/OSSExplorer.ica","type":"CITRIX"},{"id":"OSSNetworkExplorer","name":"OSS Network Explorer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/OSSNetworkExplorer.ica","type":"CITRIX"},{"id":"CellAvailablility","name":"Cell Availablility","favorite":false,"info":null,"detail":null,"uri":"http://atrcxb1640.athtem.eei.ericsson.se:8080/car/","type":"WEB"},{"id":"CN_NSD","name":"CN Node Status Display","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CN_NSD.ica","type":"CITRIX"},{"id":"TEI","name":"Tool for Import and Export (TEI)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TEI.ica","type":"CITRIX"},{"id":"Firefox","name":"Firefox Web Browser","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Firefox.ica","type":"CITRIX"},{"id":"TSSGui","name":"TSS Gui","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TSSGui.ica","type":"CITRIX"},{"id":"InformationModelInstanceMgr","name":"Information Model Instance Mgr","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/InformationModelInstanceMgr.ica","type":"CITRIX"},{"id":"TDSLogAdminstration","name":"TDS Log Adminstration","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TDSLogAdminstration.ica","type":"CITRIX"},{"id":"OSSCommonExplorer","name":"OSS Common Explorer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/OSSCommonExplorer.ica","type":"CITRIX"},{"id":"Job_Task_Editor","name":"Job Task Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Job_Task_Editor.ica","type":"CITRIX"}]},{"id":"perf","name":"Performance","apps":[{"id":"RNO","name":"Radio Network Optimization","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/RNO.ica","type":"CITRIX"},{"id":"EventBasedAppsGSM","name":"Event Based Applications for GSM (EBA-G)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EventBasedAppsGSM.ica","type":"CITRIX"}]},{"id":"cnt","name":"Core Network Tools","apps":[{"id":"EM_MMGw","name":"MMGw Latest Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_MMGw.ica","type":"CITRIX"},{"id":"EM_RBS","name":"RBS Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_RBS.ica","type":"CITRIX"},{"id":"EM_RNC","name":"RNC Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_RNC.ica","type":"CITRIX"},{"id":"ACT","name":"AXD Configuration Tool (ACT)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/ACT.ica","type":"CITRIX"},{"id":"PMR","name":"Performance Monitor (PMR)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/PMR.ica","type":"CITRIX"},{"id":"EM_ERBS","name":"ERBS Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_ERBS.ica","type":"CITRIX"},{"id":"EM_RXI","name":"RXI Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_RXI.ica","type":"CITRIX"}]},{"id":"admin","name":"Administration","apps":[{"id":"CIFManagementConsole","name":"CIF Management Console","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CIFManagementConsole.ica","type":"CITRIX"},{"id":"SystemLogs","name":"System Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SystemLogs.ica","type":"CITRIX"},{"id":"CIFActivityManager","name":"CIF Activity Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CIFActivityManager.ica","type":"CITRIX"},{"id":"OSS_Monitoring","name":"OSS Monitoring","favorite":false,"info":null,"detail":null,"uri":"http://atrcx1064.athtem.eei.ericsson.se:57004/app/","type":"WEB"},{"id":"SystemEventLogs","name":"System Event Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SystemEventLogs.ica","type":"CITRIX"},{"id":"ARW","name":"Add RBS Wizard (ARW)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/ARW.ica","type":"CITRIX"},{"id":"SystemErrorLogs","name":"System Error Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SystemErrorLogs.ica","type":"CITRIX"}]},{"id":"docs","name":"Documentation","apps":[{"id":"ALEX","name":"Active Library Explorer","favorite":false,"info":null,"detail":null,"uri":"http://atrcxb1640.athtem.eei.ericsson.se:80/cgi-bin/alex","type":"WEB"}]},{"id":"mon","name":"Monitoring and Troubleshooting","apps":[{"id":"NSA","name":"Node Status Analyser (NSA)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/NSA.ica","type":"CITRIX"},{"id":"WCDMARecordingFileViewer","name":"WCDMA Recording file viewer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/WCDMARecordingFileViewer.ica","type":"CITRIX"}]},{"id":"config","name":"Configuration","apps":[{"id":"IMM","name":"Interactive Messaging Manager (IMM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IMM.ica","type":"CITRIX"},{"id":"Fallback_Modify","name":"Modify Fallback","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_Modify.ica","type":"CITRIX"},null,{"id":"Job_Editor_List","name":"Job Editor List","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Job_Editor_List.ica","type":"CITRIX"},{"id":"Fallback_Export","name":"Export Fallback ","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_Export.ica","type":"CITRIX"},{"id":"MMCM","name":"M-MGw and MSC Configuration Management (MMCM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/MMCM.ica","type":"CITRIX"},{"id":"Parameter_Check","name":"Parameter Check","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Parameter_Check.ica","type":"CITRIX"},{"id":"Fallback_Delete","name":"Delete Fallback","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_Delete.ica","type":"CITRIX"},{"id":"TNViewer","name":"Transport network viewer (TN Viewer)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TNViewer.ica","type":"CITRIX"},{"id":"IMS_CM","name":"IMS Configuration Manager (IMS-CM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IMS_CM.ica","type":"CITRIX"},{"id":"IP_ConfigSupport","name":"IP Configuration Support (ICS)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IP_ConfigSupport.ica","type":"CITRIX"},{"id":"Fallback_New","name":"New Fallback  ","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_New.ica","type":"CITRIX"},{"id":"SMO","name":"Software Management Organizer (SMO)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SMO.ica","type":"CITRIX"},{"id":"Fallback","name":"Fallback","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback.ica","type":"CITRIX"},{"id":"RTR","name":"Radio Tool for Reparenting (RTR)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/RTR.ica","type":"CITRIX"},{"id":"GPRS_CM","name":"GPRS Configuration Manager (GPRS-CM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/GPRS_CM.ica","type":"CITRIX"},{"id":"WCC","name":"WRAN Consistency Check (WCC)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/WCC.ica","type":"CITRIX"},{"id":"NAM","name":"Number Analysis Manager (NAM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/NAM.ica","type":"CITRIX"},{"id":"Cell_Availablility","name":"Cell Availablility","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Cell_Availablility.ica","type":"CITRIX"},{"id":"Job_Manager","name":"Job Manager (JM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Job_Manager.ica","type":"CITRIX"},{"id":"CallPathTracing","name":"Call Path Tracing","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CallPathTracing.ica","type":"CITRIX"},{"id":"AIPCM","name":"Abis Over IP Configuration Management (AIPCM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AIPCM.ica","type":"CITRIX"}]},{"id":"add","name":"Additional","apps":[{"id":"CABV","name":"Cabinet Viewer (CABV)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CABV.ica","type":"CITRIX"},{"id":"AMOS","name":"Advanced MO Scripting (AMOS)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AMOS.ica","type":"CITRIX"}]}]';
});

$app->get('/apps', function () {
    echo '[{"id":"AlarmTextRouting","name":"Alarm Text Routing","favorite":false,"shortInfo":"Here goes some description for Alarm Text Routing","detail":null,"uri":"/rest/apps/AlarmTextRouting.ica","type":"CITRIX"},{"id":"AlarmLogBrowser","name":"Alarm Log Browser","favorite":false,"shortInfo":"Short info for Alarm Log Browser. Very long description","detail":null,"uri":"/rest/apps/AlarmLogBrowser.ica","type":"CITRIX"},{"id":"FMXEventSimulator","name":"FMX Event Simulator","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/FMXEventSimulator.ica","type":"CITRIX"},{"id":"FMXRuleEditor","name":"FMX Rule Editor","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/FMXRuleEditor.ica","type":"CITRIX"},{"id":"AlarmListViewer","name":"Alarm List Viewer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AlarmListViewer.ica","type":"CITRIX"},{"id":"AlarmStatusMatrix","name":"Alarm Status Matrix","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AlarmStatusMatrix.ica","type":"CITRIX"},{"id":"FMXModuleAdministration","name":"FMX Module Administration","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/FMXModuleAdministration.ica","type":"CITRIX"},null,{"id":"EventBasedAppsCore","name":"Event Based Apps for Core","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EventBasedAppsCore.ica","type":"CITRIX"},{"id":"IMS_Trace","name":"IMS Trace","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IMS_Trace.ica","type":"CITRIX"},{"id":"ParameterCheck","name":"Parameter Check","favorite":false,"info":null,"detail":null,"uri":"http://atrcxb1640.athtem.eei.ericsson.se:8080/parametercheck/","type":"WEB"},{"id":"CoreNetworkStatusMonitor","name":"Core Network Status Monitor","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CoreNetworkStatusMonitor.ica","type":"CITRIX"},{"id":"LAT","name":"License Administration Tool","favorite":false,"info":null,"detail":null,"uri":"https://atrcxb1640.athtem.eei.ericsson.se:8181/lat-core-client","type":"WEB"},{"id":"CollectNELogs","name":"Collect NE Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CollectNELogs.ica","type":"CITRIX"},{"id":"IRATHOM","name":"IRATHOM","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IRATHOM.ica","type":"CITRIX"},{"id":"OSSExplorer","name":"OSS Explorer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/OSSExplorer.ica","type":"CITRIX"},{"id":"OSSNetworkExplorer","name":"OSS Network Explorer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/OSSNetworkExplorer.ica","type":"CITRIX"},{"id":"CellAvailablility","name":"Cell Availablility","favorite":false,"info":null,"detail":null,"uri":"http://atrcxb1640.athtem.eei.ericsson.se:8080/car/","type":"WEB"},{"id":"CN_NSD","name":"CN Node Status Display","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CN_NSD.ica","type":"CITRIX"},{"id":"TEI","name":"Tool for Import and Export (TEI)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TEI.ica","type":"CITRIX"},{"id":"Firefox","name":"Firefox Web Browser","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Firefox.ica","type":"CITRIX"},{"id":"TSSGui","name":"TSS Gui","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TSSGui.ica","type":"CITRIX"},{"id":"InformationModelInstanceMgr","name":"Information Model Instance Mgr","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/InformationModelInstanceMgr.ica","type":"CITRIX"},{"id":"TDSLogAdminstration","name":"TDS Log Adminstration","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TDSLogAdminstration.ica","type":"CITRIX"},{"id":"OSSCommonExplorer","name":"OSS Common Explorer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/OSSCommonExplorer.ica","type":"CITRIX"},{"id":"Job_Task_Editor","name":"Job Task Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Job_Task_Editor.ica","type":"CITRIX"},{"id":"RNO","name":"Radio Network Optimization","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/RNO.ica","type":"CITRIX"},{"id":"EventBasedAppsGSM","name":"Event Based Applications for GSM (EBA-G)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EventBasedAppsGSM.ica","type":"CITRIX"},{"id":"EM_MMGw","name":"MMGw Latest Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_MMGw.ica","type":"CITRIX"},{"id":"EM_RBS","name":"RBS Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_RBS.ica","type":"CITRIX"},{"id":"EM_RNC","name":"RNC Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_RNC.ica","type":"CITRIX"},{"id":"ACT","name":"AXD Configuration Tool (ACT)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/ACT.ica","type":"CITRIX"},{"id":"PMR","name":"Performance Monitor (PMR)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/PMR.ica","type":"CITRIX"},{"id":"EM_ERBS","name":"ERBS Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_ERBS.ica","type":"CITRIX"},{"id":"EM_RXI","name":"RXI Element Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/EM_RXI.ica","type":"CITRIX"},{"id":"CIFManagementConsole","name":"CIF Management Console","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CIFManagementConsole.ica","type":"CITRIX"},{"id":"SystemLogs","name":"System Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SystemLogs.ica","type":"CITRIX"},{"id":"CIFActivityManager","name":"CIF Activity Manager","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CIFActivityManager.ica","type":"CITRIX"},{"id":"OSS_Monitoring","name":"OSS Monitoring","favorite":false,"info":null,"detail":null,"uri":"http://atrcx1064.athtem.eei.ericsson.se:57004/app/","type":"WEB"},{"id":"SystemEventLogs","name":"System Event Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SystemEventLogs.ica","type":"CITRIX"},{"id":"ARW","name":"Add RBS Wizard (ARW)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/ARW.ica","type":"CITRIX"},{"id":"SystemErrorLogs","name":"System Error Logs","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SystemErrorLogs.ica","type":"CITRIX"},{"id":"ALEX","name":"Active Library Explorer","favorite":false,"info":null,"detail":null,"uri":"http://atrcxb1640.athtem.eei.ericsson.se:80/cgi-bin/alex","type":"WEB"},{"id":"NSA","name":"Node Status Analyser (NSA)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/NSA.ica","type":"CITRIX"},{"id":"WCDMARecordingFileViewer","name":"WCDMA Recording file viewer","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/WCDMARecordingFileViewer.ica","type":"CITRIX"},{"id":"IMM","name":"Interactive Messaging Manager (IMM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IMM.ica","type":"CITRIX"},{"id":"Fallback_Modify","name":"Modify Fallback","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_Modify.ica","type":"CITRIX"},null,{"id":"Job_Editor_List","name":"Job Editor List","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Job_Editor_List.ica","type":"CITRIX"},{"id":"Fallback_Export","name":"Export Fallback ","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_Export.ica","type":"CITRIX"},{"id":"MMCM","name":"M-MGw and MSC Configuration Management (MMCM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/MMCM.ica","type":"CITRIX"},{"id":"Parameter_Check","name":"Parameter Check","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Parameter_Check.ica","type":"CITRIX"},{"id":"Fallback_Delete","name":"Delete Fallback","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_Delete.ica","type":"CITRIX"},{"id":"TNViewer","name":"Transport network viewer (TN Viewer)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/TNViewer.ica","type":"CITRIX"},{"id":"IMS_CM","name":"IMS Configuration Manager (IMS-CM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IMS_CM.ica","type":"CITRIX"},{"id":"IP_ConfigSupport","name":"IP Configuration Support (ICS)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/IP_ConfigSupport.ica","type":"CITRIX"},{"id":"Fallback_New","name":"New Fallback  ","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback_New.ica","type":"CITRIX"},{"id":"SMO","name":"Software Management Organizer (SMO)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/SMO.ica","type":"CITRIX"},{"id":"Fallback","name":"Fallback","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Fallback.ica","type":"CITRIX"},{"id":"RTR","name":"Radio Tool for Reparenting (RTR)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/RTR.ica","type":"CITRIX"},{"id":"GPRS_CM","name":"GPRS Configuration Manager (GPRS-CM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/GPRS_CM.ica","type":"CITRIX"},{"id":"WCC","name":"WRAN Consistency Check (WCC)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/WCC.ica","type":"CITRIX"},{"id":"NAM","name":"Number Analysis Manager (NAM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/NAM.ica","type":"CITRIX"},{"id":"Cell_Availablility","name":"Cell Availablility","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Cell_Availablility.ica","type":"CITRIX"},{"id":"Job_Manager","name":"Job Manager (JM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/Job_Manager.ica","type":"CITRIX"},{"id":"CallPathTracing","name":"Call Path Tracing","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CallPathTracing.ica","type":"CITRIX"},{"id":"AIPCM","name":"Abis Over IP Configuration Management (AIPCM)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AIPCM.ica","type":"CITRIX"},{"id":"CABV","name":"Cabinet Viewer (CABV)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/CABV.ica","type":"CITRIX"},{"id":"AMOS","name":"Advanced MO Scripting (AMOS)","favorite":false,"info":null,"detail":null,"uri":"/rest/apps/AMOS.ica","type":"CITRIX"}]';
});

$app->get('/favorites', function () {
    echo '[]';
});

$app->post('/login', function () {
    $data = array();
    $data['id'] = 'userId0';
    $data['name'] = 'UserName';
    echo json_encode($data);
});
$app->post('/logout', function () {
    echo json_encode(array());
});
$app->run();

?>
