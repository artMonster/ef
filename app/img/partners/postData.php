<?php

    //Include database configuration file
    include('dbConfig.php');
    
    if ($db->connect_errno) {
        echo "Извините, возникла проблема на сайте";
        exit;
    }

    $data = array();
    $tab_currency_pairs = array();
    $tab_metals = array();
    $tab_raw_materials = array();
    $tab_crypto = array();
    $i_cp = 0;
    $i_m = 0;
    $i_rm = 0;
    $i_c = 0;
    
    $string = "'EURUSD.','GBPUSD.','USDJPY.','USDCAD.','USDCHF.','XAUUSD.','XAGUSD.','WTNUSD.','LCOUSD.','BTCUSD.','LTCUSD.','ETHUSD.'";

    $sql = "SELECT SYMBOL, BID, ASK, DIGITS FROM MT4_PRICES WHERE SYMBOL IN ($string)";// 

    if (!$result = $db->query($sql)) {
        echo "Извините, возникла проблема в работе сайта.";
    }    

    while ($actor = $result->fetch_assoc()) {
        array_push($data, $actor);
    }

    foreach ($data as $value) {
        $sumbol = $value['SYMBOL'];
        $digits = (int)$value['DIGITS'];
        //sprintf($format, BID);
        $spred_par = pow(10, $digits-1)*$value['ASK'] - pow(10, $digits-1)*$value['BID'];
        $spred = pow(10, $digits)*$value['ASK'] - pow(10, $digits)*$value['BID'];
        $spred_usd = $value['ASK'] - $value['BID'];
        $format = "%0." . $digits . "f";
        if ($sumbol == 'EURUSD.' || $sumbol == 'GBPUSD.' || $sumbol == 'USDJPY.' || $sumbol == 'USDCAD.' || $sumbol == 'USDCHF.') {
            $tab_currency_pairs[$i_cp] = array(
                'symbol' => strstr($sumbol, '.' , true),
                'bid' => sprintf($format, $value['BID']),
                'spred' => $spred_par,
                'digits' => $digits,
            );
            $i_cp++;
        } elseif ($sumbol == 'XAGUSD.' || $sumbol == 'XAUUSD.') {
            if ($sumbol == 'XAGUSD.') {
                $spred = $spred_par;
            }
            $tab_metals[$i_m] = array(
                'symbol' => strstr($sumbol, '.' , true),
                'bid' => sprintf($format, $value['BID']),
                'spred' => $spred,
                'digits' => $digits,
            );
            $i_m++;
        } elseif ($sumbol == 'WTNUSD.' || $sumbol == 'LCOUSD.') {
            $tab_raw_materials[$i_rm] = array(
                'symbol' => strstr($sumbol, '.' , true),
                'bid' => sprintf($format, $value['BID']),
                'spred' => $spred_usd,
                'digits' => $digits,
            );
            $i_rm++;
        } elseif ($sumbol == 'BTCUSD.' || $sumbol == 'LTCUSD.' || $sumbol == 'ETHUSD.') {
            $tab_crypto[$i_c] = array(
                'symbol' => strstr($sumbol, '.' , true),
                'bid' => sprintf($format, $value['BID']),
                'spred' => $spred_usd,
                'digits' => $digits,
            );
            $i_c++;
        }
    }
    
    $array = array(
        'currency_pairs' => $tab_currency_pairs,
        'metals' => $tab_metals,
        'raw_materials' => $tab_raw_materials,
        'crypto' => $tab_crypto,
    );

    $filename = 'temp_array2.txt';
    $data_for_file = serialize(array("day_data" => $array));
    file_put_contents($filename, $data_for_file);

    $result->free();
    $db->close();