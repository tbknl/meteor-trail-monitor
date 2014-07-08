Package.describe({
    summary: "Trail-Monitor - Client-side monitoring for Trail log messages"
});

Package.on_use(function(api) {
    api.use('trail', ['server', 'client']);
    api.use('deps', 'client');
    api.use('templating', 'client');
    api.use('session', 'client');

    // Allow us to detect 'insecure'.
    api.use('insecure', {weak: true});

    api.add_files('trail_monitor.js', ['server', 'client']);
    api.add_files('trail_monitor-server.js', ['server']);
    api.add_files('trail_monitor-client.js', ['client']);

    api.add_files('monitor_console/trail_monitor_console.html', ['client']);
    api.add_files('monitor_console/trail_monitor_console.js', ['client']);
    api.add_files('monitor_console/trail_monitor_console.css', ['client']);

    api.export && api.export('Trail', ['server', 'client']);
});

Package.on_test(function (api) {
  api.use(['trail', 'tinytest', 'test-helpers']);

  api.add_files('trail_monitor_tests.js', ['server']);
});
