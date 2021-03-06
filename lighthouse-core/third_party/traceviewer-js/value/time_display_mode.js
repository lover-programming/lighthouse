/**
Copyright 2015 The Chromium Authors. All rights reserved.
Use of this source code is governed by a BSD-style license that can be
found in the LICENSE file.
**/

require("../base/base.js");

'use strict';

/**
 * @fileoverview Time currentDisplayUnit
 */
global.tr.exportTo('tr.v', function() {
  var msDisplayMode = {
    scale: 1e-3,
    suffix: 'ms',
    // Compares a < b with adjustments to precision errors.
    roundedLess: function(a, b) {
      return Math.round(a * 1000) < Math.round(b * 1000);
    },
    format: function(ts) {
      return new Number(ts)
          .toLocaleString(undefined, { minimumFractionDigits: 3 }) + ' ms';
    }
  };

  var nsDisplayMode = {
    scale: 1e-9,
    suffix: 'ns',
    // Compares a < b with adjustments to precision errors.
    roundedLess: function(a, b) {
      return Math.round(a * 1000000) < Math.round(b * 1000000);
    },
    format: function(ts) {
      return new Number(ts * 1000000)
          .toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' ns';
    }
  };

  var TimeDisplayModes = {
    ns: nsDisplayMode,
    ms: msDisplayMode
  };

  return {
    TimeDisplayModes: TimeDisplayModes
  };
});
