<?php

/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2014 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments;

use OCA\Richdocuments\AppInfo\Application;

class Converter {
	
	const TEST_DOC_PATH = '/assets/test.doc';
	
	public static function testConversion(){
		$targetFilter = 'odt:writer8';
		$targetExtension = 'odt';
		$input = file_get_contents(dirname(__DIR__) . self::TEST_DOC_PATH);
		$infile = \OC::$server->getTempManager()->getTemporaryFile();
		$outdir = \OC::$server->getTempManager()->getTemporaryFolder();
		$outfile = $outdir . '/' . basename($infile) . '.' . $targetExtension;
		$cmd = Helper::findOpenOffice();
 
		$params = ' --headless --convert-to ' . escapeshellarg($targetFilter) . ' --outdir ' 
			. escapeshellarg($outdir) 
			. ' --writer '. escapeshellarg($infile) 
			. ' -env:UserInstallation=file://'
			. escapeshellarg(\OC::$server->getTempManager()->getTempBaseDir() . '/owncloud-' . \OC_Util::getInstanceId().'/') . ' 2>&1'
		;
		file_put_contents($infile, $input);
 
		$result = shell_exec($cmd . $params);
 		$exists = file_exists($outfile);
		
		if (!$exists){
			\OC::$server->getLogger()->warn(
				'Conversion test failed. Raw output:' . $result,
				['app' => 'richdocuments']
				
			);
			return false;
		} else {
			unlink($outfile);
		}
		return true;
	}
	
	public static function convert($input, $targetFilter, $targetExtension){
		if (self::getAppConfig()->getAppValue('converter') === 'local'){
			$output = self::convertLocal($input, $targetFilter, $targetExtension);
		} else {
			$output = self::convertExternal($input, $targetExtension);
		}
		
		if (empty($output)){
			\OC::$server->getLogger()->warn(
				'Empty conversion output',
				['app' => 'richdocuments']
				
			);
			throw new \RuntimeException('Empty conversion output');
		}
		return $output;
	}
	
	public static function checkConnection(){
		$expected = file_get_contents(dirname(__DIR__) . '/assets/response.odt');
		$converted = self::convertExternal('', 'odt');
		
		return $converted === $expected;
	}
	
	/**
	 * convert via openOffice hosted on the same server
	 * @param string $input
	 * @param string $targetFilter
	 * @param string $targetExtension
	 * @return string
	 */
	protected static function convertLocal($input, $targetFilter, $targetExtension){
		$infile = \OC::$server->getTempManager()->getTemporaryFile();
		$outdir = \OC::$server->getTempManager()->getTemporaryFolder();
		$cmd = Helper::findOpenOffice();
		$params = ' --headless --convert-to ' . $targetFilter . ' --outdir ' 
				. escapeshellarg($outdir) 
				. ' --writer '. escapeshellarg($infile)
				. ' -env:UserInstallation=file://'
				. escapeshellarg(\OC::$server->getTempManager()->getTempBaseDir() . '/owncloud-' . \OC_Util::getInstanceId().'/')
		;
		
		file_put_contents($infile, $input);
		shell_exec($cmd . $params);
		$output = file_get_contents($outdir . '/' . basename($infile) . '.' . $targetExtension);
			
		return $output;
	}

	/**
	 * convert via format-filter-server installed on the same host with openOffice
	 * @param string $input
	 * @return string
	 */
	protected static function convertExternal($input, $targetExtension){
		$options = array(
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_HEADER => false,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_ENCODING => "",
			CURLOPT_AUTOREFERER => true,
			CURLOPT_CONNECTTIMEOUT => 120,
			CURLOPT_TIMEOUT => 120,
			CURLOPT_MAXREDIRS => 2,
			CURLOPT_POST => 1,
			CURLOPT_POSTFIELDS => $input,
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_VERBOSE => 1
		);

		$ch = curl_init(self::getAppConfig()->getAppValue('converter_url') . '?target_format=' . $targetExtension);
		curl_setopt_array($ch, $options);
		$content = curl_exec($ch);
		if (curl_errno($ch)){
			\OC::$server->getLogger()->debug(
				'cURL error' . curl_errno($ch) . ':' . curl_error($ch),
				['app' => 'richdocuments']
				
			);
		}
		curl_close($ch);
		
		return $content;
	}
	
	protected static function getAppConfig(){
		$app = new Application();
		$c = $app->getContainer();
		return $c->query('AppConfig');
	}

}
