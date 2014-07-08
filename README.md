meteor-trail-monitor
=====================

Trail-Monitor - Client-side monitoring for Trail log messages.


Installation
------------
Install this package using [Meteorite](https://github.com/oortcloud/meteorite/).
Note: This package depends on the [Trail](https://github.com/tbknl/meteor-trail) package.
``` sh
mrt add trail-monitor
```

Note: This package is meant to be used for development purposes. It's highly recommended NOT TO USE THIS PACKAGE IN PRODUCTION systems.


Changelog summary
-----------------
* 0.2.0 - Support for blaze. 


Configuration:
--------------
Inside the Trail client-side settings you can enable monitors, configure the console and define your monitors. Example confiuration:

``` json
{
  ...
  "public": {
    ...
    "trail": {
      ...
      "monitor": true,
      "monitor_console": {"show": true, "large": false},
      "monitors": [
        {
          "name": "Server + Client",
          "options": {"limit": 400}
        },
        {
          "name": "Client only",
          "filter": {"client": true}
        },
        {
            "name": "All clients W+E",
            "filter": {"client": true, "other_clients": true, "level": "WARN"}
        },
        {
            "name": "Server only",
            "filter": {"server": true}
        }
      ]
      ...
      ]
    }
    ...
  }
}
```

You can set `options` per monitor, such as the amount of messages to keep in memory with `limit`.

You can specify the `filter` to control which messages will be shown through the monitor.

The default appearance of the monitor console can be set through the `monitor_console` setting.


Usage
-----
Press Ctrl-Shift-M to toggle the monitor console.

You can switch between different monitors using the dropdown box in the monitor console.


Contributions
-------------
Any contributions are welcome. Please create an issue on github to start a discussion about the contribution you're planning to make.
