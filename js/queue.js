function Queue(){function e(e){this.debug&&console.log("Offered a Queued Function."),"function"==typeof e?this.dataStore.push(e):console.log("You must offer a function.")}function t(){return this.debug&&console.log("Polled a Queued Function."),this.dataStore.shift()}function u(){var e=this.poll();void 0!==e&&(this.debug&&console.log("Run a Queued Function."),e())}function o(){this.debug=!0}this.dataStore=[],this.offer=e,this.poll=t,this.execNext=u,this.debug=!1,this.startDebug=o}var queue=new Queue;$(document).ready(function(){setTimeout(function(){setInterval(function(){queue.execNext()},500)},3e3)});