(function () {
    document.querySelector('#gg_start').addEventListener('click', function (e) {
        e.preventDefault();
        e.toElement.disabled = true;

        const cards = [
            {
                selector: '#header_title',
                position: 'bottom',
                content:
                    "<strong>Welcome to Gentle Guide!</strong><br />A dependency-free library to create interactive walkthroughs in web-apps. <em>Let's start!</em>",
            },
            {
                selector: '#title_install_npm',
                position: 'top',
                content: 'You can install it with npm...',
            },
            {
                selector: '#title_install_yarn',
                position: 'top',
                content: '...with Yarn...',
            },
            {
                selector: '#title_install_link',
                position: 'top',
                content: '...or simply link to our dist files.',
            },
            {
                selector: '#title_usage_basic',
                position: 'top',
                content: 'As you can see, making a new guide is very simple.',
            },
            {
                selector: '#link_github',
                position: 'bottom',
                content:
                    "You can find us on <a href='https://github.com/devmanextensions/gentle-guide' target='_blank'>GitHub</a>...",
            },
            {
                selector: '.love',
                position: 'top',
                content: '...and spread some love giving us a star.',
            },
            {
                selector: '#link_npm',
                position: 'bottom',
                content:
                    "We're also in <a href='https://www.npmjs.com/package/@devmanextensions/gentle-guide' target='_blank'>npm</a>.",
            },
            {
                selector: '#gg_start',
                position: 'right',
                content: 'This guide will end now, but you can start it again here.',
            },
        ];

        const gguide = new GGuide(cards, {
            onFinish: function () {
                e.toElement.disabled = false;
            },
        }).begin();
    });
})();
