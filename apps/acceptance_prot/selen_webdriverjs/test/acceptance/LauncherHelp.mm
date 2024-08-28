<map version="0.9.0">
<!-- To view this file, download free mind mapping software FreeMind from http://freemind.sourceforge.net -->
<node CREATED="1336037971857" ID="ID_150542004" MODIFIED="1360324662967" TEXT="TORFTUI-1067">
<node CREATED="1336037984024" ID="ID_679454563" MODIFIED="1360327856470" POSITION="right" TEXT="Functional Tests">
<node CREATED="1349088332328" ID="ID_1341370575" MODIFIED="1360602284244" TEXT="Access help link (not logged)">
<node CREATED="1336039735424" ID="ID_617006090" MODIFIED="1360324948216" TEXT="COMPONENT: LauncherHelp"/>
<node CREATED="1336038744773" ID="ID_980196555" MODIFIED="1360595704548" TEXT="DESCRIPTION: User tries to acess help hile not logged itno OSS"/>
<node CREATED="1336038752013" ID="ID_13294095" MODIFIED="1349088505351" TEXT="PRIORITY: HIGH"/>
<node CREATED="1336038780830" ID="ID_846806616" MODIFIED="1349088511388" TEXT="GROUP: Acceptance"/>
<node CREATED="1336038860069" ID="ID_1536164154" MODIFIED="1360325408313" TEXT="PRE: User is not logged in to OSS. "/>
<node CREATED="1349683533812" ID="ID_697445702" MODIFIED="1360602378489" TEXT="EXECUTE: User accessed help url directly">
<node CREATED="1349683563238" ID="ID_521912669" MODIFIED="1360325498710" TEXT="VERIFY: User is reverted to OSS login page."/>
</node>
<node CREATED="1360602322080" ID="ID_1334477578" MODIFIED="1360602444123" TEXT="EXECUTE: EXECUTE: User accessed help url directly, was redirected to login screen and logged into OSS">
<node CREATED="1360600694888" ID="ID_67141510" MODIFIED="1360600715102" TEXT="VERIFY: Help main page is displayed."/>
</node>
<node CREATED="1336039548353" ID="ID_1987127041" MODIFIED="1349088542121" TEXT="VUSERS: 1"/>
<node CREATED="1343750957036" ID="ID_80949022" MODIFIED="1349089031156" TEXT="CONTEXT: UI"/>
</node>
<node CREATED="1349088987491" ID="ID_1684713549" MODIFIED="1360342106401" TEXT="Access help link (user logged)">
<node CREATED="1336039735424" ID="ID_643372460" MODIFIED="1360342119315" TEXT="COMPONENT: LauncherHelp"/>
<node CREATED="1336038744773" ID="ID_1377703663" MODIFIED="1360595718897" TEXT="DESCRIPTION: DESCRIPTION: User tries to acess help hile logged itno OSS"/>
<node CREATED="1336038752013" ID="ID_1040698185" MODIFIED="1349088505351" TEXT="PRIORITY: HIGH"/>
<node CREATED="1336038780830" ID="ID_400627691" MODIFIED="1349088511388" TEXT="GROUP: Acceptance"/>
<node CREATED="1336038860069" ID="ID_1221614121" MODIFIED="1360325842760">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      PRE: User has logged into OSS.
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1336038805518" ID="ID_555191076" MODIFIED="1360342371927">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      EXECUTE: Using browser address bar navigate to help url, relative to OSS Launcher (/dmsHelp)
    </p>
  </body>
</html></richcontent>
<node CREATED="1336038832124" ID="ID_729453144" MODIFIED="1360348830669">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      VERIFY: Launcher help main page is displayed.
    </p>
  </body>
</html></richcontent>
</node>
</node>
<node CREATED="1336039548353" ID="ID_1133325873" MODIFIED="1349088542121" TEXT="VUSERS: 1"/>
<node CREATED="1343750957036" ID="ID_146473403" MODIFIED="1349089031156" TEXT="CONTEXT: UI"/>
</node>
<node CREATED="1349095495409" ID="ID_321022227" MODIFIED="1360326037934" TEXT="Help Content">
<node CREATED="1336039735424" ID="ID_567764628" MODIFIED="1360342121956" TEXT="COMPONENT: LauncherHelp"/>
<node CREATED="1336038744773" ID="ID_1034103324" MODIFIED="1360327972032" TEXT="DESCRIPTION: As a user I want basic help (text only) for the Tor Launcher"/>
<node CREATED="1336038752013" ID="ID_1728251584" MODIFIED="1349088505351" TEXT="PRIORITY: HIGH"/>
<node CREATED="1336038780830" ID="ID_555741819" MODIFIED="1349088511388" TEXT="GROUP: Acceptance"/>
<node CREATED="1336038860069" ID="ID_914496791" MODIFIED="1360327041901" VSHIFT="-21">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      PRE: User has logged into OSS and navigate to help URL.
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1336038805518" HGAP="32" ID="ID_387646383" MODIFIED="1360327039229" VSHIFT="-21">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      EXECUTE: Click on each section from left side menu (including home).
    </p>
  </body>
</html></richcontent>
<node CREATED="1336038832124" ID="ID_1400352885" MODIFIED="1360326225311">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      VERIFY: Each section from the menu provides content to the page when clicked.
    </p>
  </body>
</html></richcontent>
</node>
</node>
<node CREATED="1349095802274" HGAP="35" ID="ID_1887939284" MODIFIED="1360327036317" TEXT="EXECUTE: Click on any link accessible from home page." VSHIFT="-28">
<node CREATED="1336038832124" ID="ID_559976424" MODIFIED="1360326629513">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      VERIFY: Target page is reached (HTTP 200 is returned).
    </p>
  </body>
</html></richcontent>
</node>
</node>
<node CREATED="1349095840412" HGAP="39" ID="ID_1084434478" MODIFIED="1360327030005" TEXT="EXECUTE: Click on each section from left side menu (including home)." VSHIFT="-16">
<node CREATED="1336038832124" ID="ID_423007618" MODIFIED="1360326740957">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      VERIFY: Any link found in content from particular section is reacheable (HTTP200 repsonse is obtained).
    </p>
  </body>
</html></richcontent>
</node>
</node>
<node CREATED="1336039548353" ID="ID_1316747757" MODIFIED="1349088542121" TEXT="VUSERS: 1"/>
<node CREATED="1343750957036" ID="ID_1526802717" MODIFIED="1349089031156" TEXT="CONTEXT: UI"/>
</node>
<node CREATED="1349095495409" ID="ID_1486144108" MODIFIED="1360327894594" TEXT="Interface Styles">
<node CREATED="1336039735424" ID="ID_924104662" MODIFIED="1360342127259" TEXT="COMPONENT: LauncherHelp"/>
<node CREATED="1336038744773" ID="ID_1920837469" MODIFIED="1360328087421" TEXT="DESCRIPTION: Inspect manually if interface styles are displayed correctly in each supported browser."/>
<node CREATED="1336038752013" ID="ID_455886940" MODIFIED="1349088505351" TEXT="PRIORITY: HIGH"/>
<node CREATED="1336038780830" ID="ID_443524571" MODIFIED="1349088511388" TEXT="GROUP: Acceptance"/>
<node CREATED="1336038860069" ID="ID_1427663466" MODIFIED="1360327041901" VSHIFT="-21">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      PRE: User has logged into OSS and navigate to help URL.
    </p>
  </body>
</html></richcontent>
</node>
<node CREATED="1336038805518" HGAP="32" ID="ID_995815300" MODIFIED="1360328050964" VSHIFT="-21">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      EXECUTE: Click on each section from left side menu (including home).
    </p>
  </body>
</html></richcontent>
<node CREATED="1336038832124" ID="ID_227365585" MODIFIED="1360328459828">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      VERIFY: Content and graphical elements are visible with correct styles applied and positioned as expected (according to UX Mockup).
    </p>
  </body>
</html></richcontent>
</node>
</node>
<node CREATED="1349095802274" HGAP="35" ID="ID_1463887021" MODIFIED="1360328171001" TEXT="EXECUTE: Click on any link accessible from home page." VSHIFT="-28">
<node CREATED="1336038832124" ID="ID_1712773982" MODIFIED="1360328463691">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      VERIFY: Content and graphical elements are visible with correct styles applied and positioned as expected (according to UX Mockup).
    </p>
  </body>
</html></richcontent>
</node>
</node>
<node CREATED="1349095840412" HGAP="39" ID="ID_388681067" MODIFIED="1360327030005" TEXT="EXECUTE: Click on each section from left side menu (including home)." VSHIFT="-16">
<node CREATED="1336038832124" ID="ID_1434519758" MODIFIED="1360328467377">
<richcontent TYPE="NODE"><html>
  <head>
    
  </head>
  <body>
    <p>
      VERIFY: Content and graphical elements are visible with correct styles applied and positioned as expected (according to UX Mockup).
    </p>
  </body>
</html></richcontent>
</node>
</node>
<node CREATED="1336039548353" ID="ID_283718541" MODIFIED="1349088542121" TEXT="VUSERS: 1"/>
<node CREATED="1343750957036" ID="ID_1391137282" MODIFIED="1349089031156" TEXT="CONTEXT: UI"/>
</node>
</node>
<node CREATED="1336037980751" ID="ID_353380802" MODIFIED="1349770715340" POSITION="right" TEXT="Performance Tests"/>
<node CREATED="1336038065478" ID="ID_1299048467" MODIFIED="1343766431087" POSITION="right" TEXT="Workflow Tests"/>
<node CREATED="1336037987873" ID="ID_1820063504" MODIFIED="1343766451965" POSITION="right" TEXT="HighAvailability Tests"/>
<node CREATED="1343766476125" ID="ID_1303512424" MODIFIED="1343766481054" POSITION="right" TEXT="Scalability Tests"/>
<node CREATED="1343766458099" ID="ID_1903836703" MODIFIED="1343766468545" POSITION="right" TEXT="Robustness Tests"/>
<node CREATED="1336038009268" ID="ID_970254648" MODIFIED="1336038015456" POSITION="right" TEXT="Security Tests"/>
</node>
</map>
