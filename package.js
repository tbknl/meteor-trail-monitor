Package.describe({
    summary: "Trail-Monitor - Client-side monitoring for Trail log messages",
    version: "0.2.1",
    name: 'mrt:trail-monitor',
    git: "https://github.com/tbknl/meteor-trail-monitor.git"
});

Package.onUse(function(api) {
    api.versionsFrom('0.9.0');

    api.use('mrt:trail@0.1.1', ['server', 'client']);
    api.use('deps', 'client');
    api.use('templating', 'client');
    api.use('session', 'client');

    // Allow us to detect 'insecure'.
    api.use('insecure', {weak: true});

    api.addFiles('trail_monitor.js', ['server', 'client']);
    api.addFiles('trail_monitor-server.js', ['server']);
    api.addFiles('trail_monitor-client.js', ['client']);

    api.addFiles('monitor_console/trail_monitor_console.html', ['client']);
    api.addFiles('monitor_console/trail_monitor_console.js', ['client']);
    api.addFiles('monitor_console/trail_monitor_console.css', ['client']);

    api.export && api.export('Trail', ['server', 'client']);
});

Package.onTest(function (api) {
    api.use(['mrt:trail@0.1.1', 'tinytest', 'test-helpers']);

    api.add_files('trail_monitor_tests.js', ['server']);
});
