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
			/* 
				You can specify a tag format in the $style variable, 
				by giving two tag names separated by a hyphen. 
				First tag specifies outer tag, 
				second specifies inner tag. 
				e.g: "select-option"
			*/
			if(strrpos($style,"-") != false){ 
				$sections = explode("-",$style);
				$a = $sections[0];
				$b = $sections[1];
				while($row = $result -> fetch_assoc()){
				    $strout .= "<".$a.">";
					foreach($row as $field => $value){
					    $strout .= "<".$b.">";
						$strout .= $value;
						$strout .= "</".$b.">";
					}
					$strout .= "</".$a.">";
				}
			}
			else{
				/*
					Otherwise, use one of the following preset formats.
				*/
				
				switch($style){
					/* 
						Output as a JSON-formatted string; 
						JSON.parse() will be needed.
						Useful for AJAX and dealing with Javascript.
						
						JSON format: 
						[
							{ // Row 0
								field_name : value,
								field_name : value,
								...
							}
							{ // Row 1
								field_name : value,
								field_name : value,
								...
							},
							...
							  // Row N
						]
					*/
					
					case "JSON":
						$strout .= "[";
						while($row = $result -> fetch_assoc()){
							$strout .= "{";
							foreach($row as $field => $value){
								$strout .= "\"".$field."\":";
								if (is_string($value)){
									$strout .= "\"".$value."\"";
								}
								else if (is_null($value)){
									$strout .= "null";
								}
								else {
									$strout .= strval($value);
								}
								$strout .= ",";
							}
							if(substr($strout,-1) == ",") $strout = substr($strout,0,-1);
							$strout .= "},";
						}
						if(substr($strout,-1) == ",") $strout = substr($strout,0,-1);
						$strout .= "]";
						break;
					
					/*
						Output as an html table;
						field names are placed within the top row in <th> tag-pairs;
					*/
						
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
			}
            return $strout;
        }
    }
?>