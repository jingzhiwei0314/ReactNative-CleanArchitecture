'use strict';

const EventEmitter = require('events');

class CustomEvent extends EventEmitter {

}

const customEvent = new CustomEvent();
export default customEvent;