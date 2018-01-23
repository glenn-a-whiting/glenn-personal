<?php
    function query($q,$style){
        $host = "";
        $port = 3306;
        $user = "";
        $pass = "";
        $database = "";
        $db = new mysqli($host,$user,$pass,$database,$port);
        if($db->connect_error){
            return "[connection error]";
        }
        else{
            $result = $db->query($q);
            $strout = "";
            switch($style){
                case "JSON":
                    $strout .= "[";
                    while($row = $result -> fetch_assoc()){
                        $strout .= "{";
                        foreach($row as $field => $value){
                            $strout .= "\"".$field."\":";
                            if (is_numeric($value)) $strout .= $value;
                            else $strout .= "\"".$value."\"";
                            $strout .= ",";
                        }
                        if(substr($strout,-1) == ",") $strout = substr($strout,0,-1);
                        $strout .= "},";
                    }
                    if(substr($strout,-1) == ",") $strout = substr($strout,0,-1);
                    $strout .= "]";
                    break;
                    
                case "TABLE":
                    $strout .= "<table><tr>";
                    foreach($result -> fetch_fields() as $field){
                        $strout .= "<th>" . $field->name . "</th>";
                    }
                    $strout .= "</tr>";
                    while($row = $result -> fetch_assoc()){
                        $strout .= "<tr>";
                        foreach($row as $field => $value) $strout .= "<td>" . $value . "</td>";
                        $strout .= "</tr>";
                    }
                    $strout .= "</table>";
                    break;
            }
            return $strout;
        }
    }
?>