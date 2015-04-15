$( document ).ready(function() {

  particlesJS('particles-js', {
    particles: {
      color: '#FFF',
      shape: 'circle', // "circle", "edge" or "triangle"
      opacity: .85,
      size: 10,
      size_random: true,
      nb: 50,
      line_linked: {
        enable_auto: true,
        distance: 60,
        color: '#FFF',
        opacity: .6,
        width: 4,
        condensed_mode: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      },
      anim: {
        enable: true,
        speed: 1
      }
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 250
      },
      detect_on: 'window', // "canvas" or "window"
      mode: 'grab',
      line_linked: {
        opacity: .5
      },
      events: {
        onclick: {
          enable: true,
          mode: 'push', // "push" or "remove" (particles)
          nb: 4
        }
      }
    },
    /* Retina Display Support */
    retina_detect: true
  });
    
    <script type="text/javascript" src="http://www.parsecdn.com/js/parse-1.4.0.min.js"></script>
});
