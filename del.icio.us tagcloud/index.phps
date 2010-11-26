<?php

    $url = "https://api.del.icio.us/v1/tags/get";

    $result = get($url);

    $thetags = array();

    $thecounts = array();

class XML {

    protected $pointer;

    public $degerler = array();
   
    function loadString($string){

        $this->pointer = simplexml_load_string($string);

                return $this->pointer;
    }
   
    function loadFile($file){

        $this->pointer = simplexml_load_file($file);

        return $this->pointer;
    }
   
    function getname(){

        return $this->pointer->getName();

    }

    function child(){

        return $this->pointer->children();

    }

    function att(){

        return $this->pointer->attributes();
    }

    function toArray(){

        foreach ($this->child() as $sq){

            $this->degerler[$this->getname()][$sq->getname()][][] = $sq; // How many key

        }

        return true;
    }
   
}//end class XML

      $ob = new XML();

      $ob->loadString($result);

      $ob->toArray();

      $x = $ob->degerler;

      $tags = $x['tags']['tag'];

      foreach($tags as $key=>$value) {

             $tag = $value[0]->attributes()->tag;

             $count = $value[0]->attributes()->count;
              
             $thetags[] = $tag;

             $thecounts[] = (int)$count;
      }

    $fontSizeMin = 15;

    $fontSizeMax = 100;

    $min_count = min(array_values($thecounts));

    $max_count = max(array_values($thecounts));

    $spread = $max_count - $min_count;

    if($spread == 0) {$spread = 1;}

    $cloud_html = '';

    $cloud_tags = array();

    $px = 'px';

    $n = count($thetags);

    for($i=0;$i<$n;$i++) {

         $pondere = $thecounts[$i]; 

         $size = $fontSizeMin + ($pondere - $min_count) * ($max_count - $min_count) / $spread;

         $cloud_tags[] = '<li style="font-size:'.floor($size).$px.'"><a href="http://delicious.com/thinkphp/'.$thetags[$i].'" title="'.$pondere.' posts">'.$thetags[$i].'</a></li>'; 
    }

    $cloud_html = join("\n",$cloud_tags);
 
 
    //using cURL
    //@param url (String) Address'uri which I want to grab
    //@return format XML
    function get($url) {

             $username = "thinkphp";

             $password = "xxxxx";

             $ch = curl_init();

             curl_setopt($ch,CURLOPT_URL,$url);

             curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

             curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);             

             curl_setopt($ch,CURLOPT_USERPWD,"$username:$password"); 

             curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);

             curl_setopt($ch,CURLOPT_CAINFO,'mozilla.pem');

             $data = curl_exec($ch);

             $error = curl_error($ch);

             curl_close($ch);

             if(empty($data)) {return $error;}

                     else {return $data;}

    };//end function get

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>del.icio.us</title>
   <style type="text/css" screen="media">
   html,body {font:14px 'trebuchet ms', tahoma, sans-serif;background:#000;color:#fff;}
   h1{font:200% georgia,times,serif;}
   a { color:#6bff63;padding: 4px}
   a:hover { background:#0D8000;color:#fff;}
   li {list-style:none;display:inline;padding:4px;}
   #ft{margin-top:2em;color:#777;font-size:90%;}
   #ft a{color:#ccc;}

   </style>
</head>
<body>
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1>/ del.icio.us / thinkphp / tags /</h1></div>
   <div id="bd" role="main">
	<div class="yui-g">
	
                        <ul>
                            <?php echo$cloud_html; ?>
                       </ul>
	</div>
	</div>
   <div id="ft" role="contentinfo"><p>Created by Adrian Statescu</p></div>
</div>
</body>
</html>