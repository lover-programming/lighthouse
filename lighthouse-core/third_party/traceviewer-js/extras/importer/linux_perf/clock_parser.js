/**
Copyright (c) 2012 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("./parser.js");
require("../../../model/counter_series.js");

'use strict';

/**
 * @fileoverview Parses trace_marker events that were inserted in the trace by
 * userland.
 */
global.tr.exportTo('tr.e.importer.linux_perf', function() {

  var ColorScheme = tr.b.ColorScheme;
  var Parser = tr.e.importer.linux_perf.Parser;

  /**
   * Parses linux trace mark events that were inserted in the trace by userland.
   * @constructor
   */
  function ClockParser(importer) {
    Parser.call(this, importer);

    importer.registerEventHandler('clock_set_rate',
        ClockParser.prototype.traceMarkWriteClockEvent.bind(this));

    this.model_ = importer.model_;
    this.ppids_ = {};
  }

  ClockParser.prototype = {
    __proto__: Parser.prototype,

    traceMarkWriteClockEvent: function(eventName, cpuNumber, pid, ts,
                                       eventBase, threadName) {
      var event = /(\S+) state=(\d+) cpu_id=(\d+)/.exec(eventBase.details);


      var name = event[1];
      var rate = parseInt(event[2]);

      var ctr = this.model_.kernel
              .getOrCreateCounter(null, name);
      // Initialize the counter's series fields if needed.
      if (ctr.numSeries === 0) {
        ctr.addSeries(new tr.model.CounterSeries('value',
            ColorScheme.getColorIdForGeneralPurposeString(
                ctr.name + '.' + 'value')));
      }
      ctr.series.forEach(function(series) {
        series.addCounterSample(ts, rate);
      });

      return true;
    }
  };

  Parser.register(ClockParser);

  return {
    ClockParser: ClockParser
  };
});
