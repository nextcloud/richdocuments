<?php

$this->create('office_genesis', 'ajax/genesis/{es_id}')
	->post()
	->action('\OCA\Office\Genesis', 'serve')
;
$this->create('office_genesis', 'ajax/genesis/{es_id}')
	->get()
	->action('\OCA\Office\Genesis', 'serve')
;
