<?php

   class MyDB extends SQLite3
   {
      function __construct()
      {
            $this->open('1621ICT.db');
      }
   }

   function getCustomers($searchTerm = null) {
      
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }
      if(!$searchTerm) {
         $sql ='SELECT * from CUSTOMERS;';
      } else {
         $sql ='SELECT * FROM CUSTOMERS WHERE FIRSTNAME LIKE "'.$searchTerm.'" OR LASTNAME LIKE "'.$searchTerm.'" OR ADDRESS LIKE "'.$searchTerm.'" OR PHONE  LIKE "'.$searchTerm.'"';
      }
      $ret = $db->query($sql);
      $array = [];
      if(!$ret){
        echo $db->lastErrorMsg();
        return [];
      } else {
         while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
            $array[] = $row;
         }
         $db->close();
         return $array;
      }
   }
   
   
   function getProducts($searchTerm = null) {
      
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }

      if(!$searchTerm) {
         $sql ='SELECT * from PRODUCTS;';
      } else {
         $sql ='SELECT * FROM PRODUCTS WHERE PRODUCTNAME LIKE "'.$searchTerm.'" OR MANUFACTURER LIKE "'.$searchTerm.'" OR DESCRIPTION LIKE "'.$searchTerm.'" OR PRICE LIKE "'.$searchTerm.'"';
      }
      $ret = $db->query($sql);
      $array = [];
      if(!$ret){
        echo $db->lastErrorMsg();
        return [];
      } else {
         while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
            $array[] = $row;
         }
         $db->close();
         return $array;
      }
   }
   
   function getImages($searchTerm = null) {
      
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }

      if(!$searchTerm) {
         $sql ='SELECT * from PRODUCTS;';
      } else {
         $sql ='SELECT * FROM PRODUCTS WHERE URL LIKE "'.$searchTerm.'"';
      }
      $ret = $db->query($sql);
      $array = [];
      if(!$ret){
        echo $db->lastErrorMsg();
        return [];
      } else {
         while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
            $array[] = $row;
         }
         $db->close();
         return $array;
      }
   }
   
   
   function getDrinks($searchTerm = null) {
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }
      
        if(!$searchTerm) {
         $sql ='SELECT * from DRINKS;';
      } else {
         $sql ='SELECT * FROM DRINKS WHERE DRINKNAME LIKE "'.$searchTerm.'" OR PRICE LIKE "'.$searchTerm.'"';
      }
      $ret = $db->query($sql);
      $array = [];
      if(!$ret){
        echo $db->lastErrorMsg();
        return [];
      } else {
         while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
            $array[] = $row;
         }
         $db->close();
         return $array;
      }
   }
   
   function getStores($searchTerm = null) {
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }
         if(!$searchTerm) {
         $sql ='SELECT * from STORES;';
      } else {
         $sql ='SELECT * FROM STORES WHERE POSTCODE LIKE "'.$searchTerm.'"';
      }
      $ret = $db->query($sql);
      $array = [];
      if(!$ret){
        echo $db->lastErrorMsg();
        return [];
      } else {
         while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
            $array[] = $row;
         }
         $db->close();
         return $array;
      }
   }
   
   
   
   
   function addCustomer($fname, $lname, $address, $phone) {
      
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }

      $sql ='INSERT INTO CUSTOMERS (FIRSTNAME, LASTNAME, ADDRESS, PHONE) VALUES ("'.$fname.'", "'.$lname.'", "'.$address.'", "'.$phone.'");';
      $db->query($sql);
   }
   
   
   function addProduct($pname, $man, $desc, $price) {
      
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }

      $sql ='INSERT INTO PRODUCTS (PRODUCTNAME, MANUFACTURER, DESCRIPTION, PRICE) VALUES ("'.$pname.'", "'.$man.'", "'.$desc.'", "'.$price.'");';
      $db->query($sql);
   }
   
   
   function addEvent($ename, $loc, $desc, $date) {
      
      $db = new MyDB();
      if(!$db){
         echo '<script type="text/javascript">alert("'.$db->lastErrorMsg().'");</script>';
      } else {
         //echo "Opened database successfully\n";
      }

      $sql ='INSERT INTO DRINKS (EVENTNAME, LOCATION, DESCRIPTION, DATE) VALUES ("'.$ename.'", "'.$loc.'", "'.$desc.'", "'.$date.'");';
      $db->query($sql);
   }
   
      
?>