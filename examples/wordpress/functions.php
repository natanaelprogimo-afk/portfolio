<?php
/**
 * WordPress child-theme stylesheet registration example.
 * PHP syntax and WordPress API mocking tested only; WordPress runtime NOT tested.
 */
if (!defined('ABSPATH')) {
    exit;
}
add_action('wp_enqueue_scripts', function () {
    $theme = wp_get_theme();
    wp_enqueue_style(
        'vyra-demo-responsive-fixes',
        get_stylesheet_directory_uri() . '/fixed.css',
        array(),
        $theme->get('Version')
    );
}, 20);
