<?php

/**
 * ownCloud - Richdocuments App
 *
 * @author Victor Dubiniuk
 * @copyright 2013 Victor Dubiniuk victor.dubiniuk@gmail.com
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later.
 */

namespace OCA\Richdocuments;

class Helper {

	const APP_ID = 'richdocuments';

	public static function getNewFileName($view, $path, $prepend = ' '){
		$fileNum = 1;

		while ($view->file_exists($path)){
			$fileNum += 1;
			$path = preg_replace('/(\.|' . $prepend . '\(\d+\)\.)([^.]*)$/', $prepend . '(' . $fileNum . ').$2', $path);
		};

		return $path;
	}

	public static function getArrayValueByKey($array, $key, $default=''){
		if (array_key_exists($key, $array)){
			return $array[$key];
		}
		return $default;
	}

	public static function isVersionsEnabled(){
		return \OCP\App::isEnabled('files_versions');
	}

	public static function getRandomColor(){
		$str = dechex(floor(rand(0, 16777215)));
		return '#' . str_pad($str, 6, "0", STR_PAD_LEFT);
	}

	/**
	 * @param string $name
	 * @return string
	 */
	public static function getMemberColor($name){
		$hash = md5($name);
		$maxRange = hexdec('ffffffffffffffffffffffffffffffff');
		$hue = hexdec($hash) / $maxRange * 256;
		return '#' . self::convertHSLToRGB($hue, 90, 60);
	}

	/**
	 * @param integer $iH
	 * @param integer $iS
	 * @param integer $iV
	 * @return string
	 */
	protected static function convertHSLToRGB($iH, $iS, $iV){
		if ($iH < 0){
			$iH = 0;   // Hue:
		}
		if ($iH > 360){
			$iH = 360; //   0-360
		}
		if ($iS < 0){
			$iS = 0;   // Saturation:
		}
		if ($iS > 100){
			$iS = 100; //   0-100
		}
		if ($iV < 0){
			$iV = 0;   // Lightness:
		}
		if ($iV > 100){
			$iV = 100; //   0-100
		}

		$dS = $iS / 100.0; // Saturation: 0.0-1.0
		$dV = $iV / 100.0; // Lightness:  0.0-1.0
		$dC = $dV * $dS;   // Chroma:     0.0-1.0
		$dH = $iH / 60.0;  // H-Prime:    0.0-6.0
		$dT = $dH;	   // Temp variable

		while ($dT >= 2.0)
			$dT -= 2.0; // php modulus does not work with float
		$dX = $dC * (1 - abs($dT - 1));	 // as used in the Wikipedia link

		switch ($dH){
			case($dH >= 0.0 && $dH < 1.0):
				$dR = $dC;
				$dG = $dX;
				$dB = 0.0;
				break;
			case($dH >= 1.0 && $dH < 2.0):
				$dR = $dX;
				$dG = $dC;
				$dB = 0.0;
				break;
			case($dH >= 2.0 && $dH < 3.0):
				$dR = 0.0;
				$dG = $dC;
				$dB = $dX;
				break;
			case($dH >= 3.0 && $dH < 4.0):
				$dR = 0.0;
				$dG = $dX;
				$dB = $dC;
				break;
			case($dH >= 4.0 && $dH < 5.0):
				$dR = $dX;
				$dG = 0.0;
				$dB = $dC;
				break;
			case($dH >= 5.0 && $dH < 6.0):
				$dR = $dC;
				$dG = 0.0;
				$dB = $dX;
				break;
			default:
				$dR = 0.0;
				$dG = 0.0;
				$dB = 0.0;
				break;
		}

		$dM = $dV - $dC;
		$dR += $dM;
		$dG += $dM;
		$dB += $dM;
		$dR *= 255;
		$dG *= 255;
		$dB *= 255;

		$dR = str_pad(dechex(round($dR)), 2, "0", STR_PAD_LEFT);
		$dG = str_pad(dechex(round($dG)), 2, "0", STR_PAD_LEFT);
		$dB = str_pad(dechex(round($dB)), 2, "0", STR_PAD_LEFT);
		return $dR.$dG.$dB;
	}

}
