/*
    Handle Parallax Effect
*/
const handleJarallaxFunc = () => {
    const parallax = document.querySelectorAll('.jarallax');
    jarallax(parallax);
}


/*
    Handle Waypoint Effect
*/
const handleWaypointFunc = () => {
    // const target = Array.from(document.getElementsByClassName('scroll__animation'));
    const target = [...document.getElementsByClassName('scroll__animation')];

    const onScrollInit = ( items ) => {
        items.forEach( item => {
                const osAnimationClass = item.getAttribute('data-os-animation'),
                osAnimationDelay = item.getAttribute('data-os-animation-delay'),
                osAnimationFrequency = item.getAttribute('data-os-animation-frequency');

            item.style.animationDelay = osAnimationDelay;

            const waypoint = new Waypoint({
                element: item,
                handler: function(direction) {
                    if (osAnimationFrequency !== 'once') {
                        item.classList.add('animated');
                        item.classList.toggle(osAnimationClass);
                    }

                    item.classList.add('animated');
                    item.classList.add(osAnimationClass);
                },
                offset: '90%'
            })
        });
    }

    onScrollInit(target);
}


/*
    Handle Menu Toggle Effect
 */
const handleMenuToggle = () => {
    const [btn, header, menu, modal, modalInner] = ['menu__wrap', 'header', 'cover__menu', 'modal', 'modal__inner']
        .map(item => document.getElementById(item));

    const items = [header, menu, modal, modalInner];

    btn.addEventListener('click', function() {
        items.map(item => {
            const isOpen = item.classList.contains("open");

            item.classList.remove('open');
            item.classList.add('close');

            if (!isOpen) {
                item.classList.add('open');
                item.classList.remove('close');
            }
        })
    }, false);
}


/*
    Handle According Toggle Effect
 */
const handleAccordionToggle = () => {
    const items = document.querySelectorAll(".accordion button");

    function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');

        items.forEach(item => {
            item.setAttribute('aria-expanded', 'false');
        })

        if (itemToggle === 'false') {
            this.setAttribute('aria-expanded', 'true');
        }
    }

    items.forEach(item => item.addEventListener('click', toggleAccordion));
}

document.addEventListener("DOMContentLoaded", function(event) {
    handleJarallaxFunc();
    handleMenuToggle();
    handleWaypointFunc();
    handleAccordionToggle();
});