// Setting keys:
var KEYS = {
    MONITOR: {
        MONITOR: 'monitor',
        MONITORS: 'monitors',
        MONITOR_PUBLISH_NAME: 'monitor_name',
        MONITOR_DEFAULT_LIMIT: 'monitor_default_limit',
        MONITOR_CONSOLE: 'monitor_console',
        MONITOR_CONSOLE_SHOW: 'show',
        MONITOR_CONSOLE_THEME: 'theme',
        MONITOR_CONSOLE_LARGE: 'large',
        MONITOR_CONSOLE_WRAP: 'wrap'
    }
};
Trail.Settings.KEYS.MONITOR = KEYS.MONITOR;


// Handle monitoring settings:
var clientSettings = Trail.Settings.clientSettings;
if (clientSettings[KEYS.MONITOR.MONITOR]) {
    Trail.Settings.Config.monitor = true;
    Trail.Settings.Config.monitorPublishName = clientSettings[KEYS.MONITOR.MONITOR_PUBLISH_NAME] || 'trail/latestmessages';
    Trail.Settings.Config.monitorDefaultLimit = typeof clientSettings[KEYS.MONITOR.MONITOR_DEFAULT_LIMIT] === 'number' ? clientSettings[KEYS.MONITOR.MONITOR_DEFAULT_LIMIT] : 200;

    var monitorConsole = clientSettings[KEYS.MONITOR.MONITOR_CONSOLE];
    Trail.Settings.Config.monitorConsole = !!monitorConsole;
    Trail.Settings.Config.monitorConsoleShow = typeof monitorConsole === 'object' && !!monitorConsole[KEYS.MONITOR.MONITOR_CONSOLE_SHOW];
    Trail.Settings.Config.monitorConsoleTheme = typeof monitorConsole === 'object' && typeof monitorConsole[KEYS.MONITOR.MONITOR_CONSOLE_THEME] === 'string' ? monitorConsole[KEYS.MONITOR.MONITOR_CONSOLE_THEME] : null;
    Trail.Settings.Config.monitorConsoleLarge = typeof monitorConsole === 'object' && !!monitorConsole[KEYS.MONITOR.MONITOR_CONSOLE_LARGE];
    Trail.Settings.Config.monitorConsoleWrap = typeof monitorConsole === 'object' && !!monitorConsole[KEYS.MONITOR.MONITOR_CONSOLE_WRAP];

    if (clientSettings[KEYS.MONITOR.MONITORS] instanceof Array) {
        Trail.Settings.Config.monitors = clientSettings[KEYS.MONITOR.MONITORS];
    }
    else {
        Trail.Settings.Config.monitors = [{name: 'Server + Client'}];
    }
}


if (Trail.Settings.Config.monitor) {
    Trail.Util.constructSelectorFromFilter = function(filter, origin_id) {
        var selector = {};

        filter = typeof filter === 'object' ? filter : {};

        if (typeof filter.level === 'string') {
            var filterLevelValue = Trail.LOG_LEVELS[filter.level];
            if (typeof filterLevelValue === 'number') {
                selector.levelValue = {$lte: filterLevelValue};
            }
        }

        if (filter.server && !filter.client) {
            selector['meta._origin'] = 'server';
        }
        else if (filter.client && !filter.server) {
            selector['meta._origin'] = 'client';
        }

        if (!filter.other_clients) {
            selector['$or'] = [{'meta._origin_id': origin_id}, {'meta._origin': {$ne: 'client'}}];
        }

        if (filter.tag) {
            selector['meta.tag'] = filter.tag;
        }

        return selector;
    };
}

