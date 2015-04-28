<?php

/**
 * ownCloud - Documents App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Documents;

class Config {
	const APP_NAME = 'documents';
	const TEST_DOC_PATH = '/assets/test.doc';
	
	public static function testConversion(){
		$targetFilter = 'odt:writer8';
		$targetExtension = 'odt';
		$input = file_get_contents(dirname(__DIR__) . self::TEST_DOC_PATH);
		$infile = \OCP\Files::tmpFile();
		$outdir = \OCP\Files::tmpFolder();
		$outfile = $outdir . '/' . basename($infile) . '.' . $targetExtension;
		$cmd = Helper::findOpenOffice();
 
		$params = ' --headless --convert-to ' . escapeshellarg($targetFilter) . ' --outdir ' 
			. escapeshellarg($outdir) 
			. ' --writer '. escapeshellarg($infile) 
			. ' -env:UserInstallation=file://'
			. escapeshellarg(get_temp_dir() . '/owncloud-' . \OC_Util::getInstanceId().'/') . ' 2>&1'
		;
		file_put_contents($infile, $input);
 
		$result = shell_exec($cmd . $params);
 		$exists = file_exists($outfile);
		
		if (!$exists){
			Helper::warnLog('Conversion test failed. Raw output:' . $result);
			return false;
		} else {
			unlink($outfile);
		}
		return true;
	}
	
	public static function getL10n(){
		return \OCP\Util::getL10N(self::APP_NAME);
	}
	
	public static function getConverter(){
		return self::getAppValue('converter', 'off');
	}
	
	public static function setConverter($value){
		return self::setAppValue('converter', $value);
	}
	
	public static function getConverterUrl(){
		return self::getAppValue('converter_url', 'http://localhost:16080');
	}
	
	public static function setConverterUrl($value){
		return self::setAppValue('converter_url', $value);
	}

	protected static function getAppValue($key, $default){
		return \OCP\Config::getAppValue(self::APP_NAME, $key, $default);
	}
	
	protected static function setAppValue($key, $value){
		return \OCP\Config::setAppValue(self::APP_NAME, $key, $value);
	}
	
}
