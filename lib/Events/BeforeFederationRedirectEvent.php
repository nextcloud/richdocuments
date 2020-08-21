<?php

namespace OCA\Richdocuments\Events;


use OCP\Files\Node;
use Symfony\Component\EventDispatcher\Event;

class BeforeFederationRedirectEvent extends Event {

    /** @var Node */
    private $node;
    /** @var string */
    private $relativePath;
    /** @var string|null */
    private $redirectUrl = null;
    /** @var string */
    private $remote;

    public function __construct($node, $relativePath, $remote) {
        $this->node = $node;
        $this->relativePath = $relativePath;
        $this->remote = $remote;
    }

    public function getRelativePath() {
        return $this->relativePath;
    }

    public function getNode() {
        return $this->node;
    }

    public function getRemote() {
        return $this->remote;
    }

    public function setRedirectUrl($redirectUrl) {
        $this->redirectUrl = $redirectUrl;
    }

    public function getRedirectUrl() {
        return $this->redirectUrl;
    }

}