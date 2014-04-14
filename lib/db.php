<?php
/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

/**
 * Generic DB class 
 */

abstract class Db {
	
	protected $data;
	
	protected $tableName;
	
	protected $insertStatement;
	
	protected $loadStatement;
	
	public function __construct($data = array()){
		$this->setData($data);
	}
	
	/**
	 * Insert current object data into database
	 * @return mixed
	 */
	public function insert(){
		$result = $this->execute($this->insertStatement);
		return $result;
	}
	
	/**
	 * Get id of the recently inserted record
	 * @return mixed
	 */
	public function getLastInsertId(){
		return \OCP\DB::insertid($this->tableName);
	}
	
	/**
	 * Get single record by primary key
	 * @param type $value primary key value
	 * @return \OCA\Documents\Db
	 */
	public function load($value){
		if (!is_array($value)){
			$value = array($value);
		}
		
		$result = $this->execute($this->loadStatement, $value);
		$data = $result->fetchRow();
		if (!is_array($data)){
			$data = array();
		}
		$this->data = $data;
		return $this;
	}
	
	/**
	 * Get single record matching condition
	 * @param string $field for WHERE condition
	 * @param mixed $value matching value(s)
	 * @return \OCA\Documents\Db
	 * @throws Exception
	 */
	public function loadBy($field, $value){
		if (!is_array($value)){
			$value = array($value);
		}
		$result = $this->execute('SELECT * FROM ' . $this->tableName . ' WHERE `'. $field .'` =?', $value);
		$data = $result->fetchAll();
		if (!is_array($data) || !count($data)){
			$this->data = array();
		} elseif (count($data)!=1) {
			throw new Exception('Duplicate ' . $value . ' for the filed ' . $field);
		} else {
			$this->data = $data[0];
		}
		
		return $this;
	}

	/**
	 * Delete records matching the condition
	 * @param string $field for WHERE condition
	 * @param mixed $value matching value(s)
	 */
	public function deleteBy($field, $value){
		if (!is_array($value)){
			$value = array($value);
		}
		$count = count($value);
		if ($count===0){
			return 0;
		} elseif ($count===1){
			$result = $this->execute('DELETE FROM ' . $this->tableName . ' WHERE `'. $field .'` =?', $value);
		} else {
			$stmt = $this->buildInQuery($field, $value);
			$result = $this->execute('DELETE FROM ' . $this->tableName . ' WHERE ' . $stmt, $value);
		}
	}
	
	/**
	 * Get all records from the table
	 * @return array
	 */
	public function getCollection(){
		$result = $this->execute('SELECT * FROM ' . $this->tableName);
		$data = $result->fetchAll();
		if (!is_array($data)){
			$data = array();
		}
		return $data;
	}
	
	/**
	 * Get array of matching records
	 * @param string $field for WHERE condition
	 * @param mixed $value matching value(s)
	 * @return array
	 */
	public function getCollectionBy($field, $value){
		if (!is_array($value)){
			$value = array($value);
		}
		$count = count($value);
		if ($count===0){
			return array();
		} elseif ($count===1){
			$result = $this->execute('SELECT * FROM ' . $this->tableName . ' WHERE `'. $field .'` =?', $value);
		} else {
			$stmt = $this->buildInQuery($field, $value);
			$result = $this->execute('SELECT * FROM ' . $this->tableName . ' WHERE '. $stmt , $value);
		}
		
		$data = $result->fetchAll();
		if (!is_array($data)){
			$data = array();
		}
		return $data;
	}
	
	/**
	 * Get object data
	 * @return Array
	 */
	public function getData(){
		return $this->data;
	}
	
	/**
	 * Set object data
	 * @param array $data
	 */
	public function setData($data){
		$this->data = $data;
	}
	
	/**
	 * Check if there are any data in current object
	 * @return bool 
	 */
	public function hasData(){
		return count($this->data)>0;
	}
	
	/**
	 * Build placeholders for the query with variable input data 
	 * @param string $field field name
	 * @param Array $array data
	 * @return String `field` IN (?, ?...) placeholders matching the number of elements in array
	 */
	protected function buildInQuery($field, $array){
		$count = count($array);
		$placeholders = array_fill(0, $count, '?');
		$stmt = implode(', ', $placeholders);
		return '`' . $field . '` IN ('  . $stmt . ')';
	}
	
	/**
	 * Execute a query on database
	 * @param string $statement query to be executed
	 * @param mixed $args value(s) for the query. 
	 * If omited the query will be run on the current object $data
	 * @return mixed (array/false)
	 */
	protected function execute($statement, $args = null){
		$query = \OCP\DB::prepare($statement);
		
		if (!is_null($args)){
			$result = $query->execute($args);
		} elseif (count($this->data)){
			$result = $query->execute($this->data);
		} else {
			$result = $query->execute();
		}
		
		return $result;
	}
	
	public function __call($name, $arguments){
		if (substr($name, 0, 3) === 'get'){
			$requestedProperty = substr($name, 3);
			$property = strtolower(preg_replace('/(.)([A-Z])/', "$1_$2", $requestedProperty));
			if (isset($this->data[$property])){
				return $this->data[$property];
			}
		}
		return null;
	}
}
