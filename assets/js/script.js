let card_selected = null
let card_enemy = Math.floor(Math.random() * 3)
const actions = ["rock", "scissors", "paper"]

$(document).ready(function () {

    const cards = $(".cards")

    $("button").click(function() {

        $(this).animate({
            opacity: 0,
        }, 400, function() {
            const playerCards = $(".cards-player")
            const cardImageList = $(".card-image")

            // mise à jour de la vitesse de déplacement des cartes
            // cards.css({"transition": ".5s all"})
            
            playerCards.children().each(function(i) { // card
                const card = $(this)
                const cardImage = $(this).find(".card-image")
                
                card.css({"transition": ".5s all"})
                
                cardImage.hover(function() {
                    card.addClass("active")
                    $(this).next().css({"opacity": "1"})
                }, function() {
                    card.removeClass("active")
                    $(this).next().css({"opacity": "0"})
                })

                cardImage.click(function(evt) {
                    card.removeClass("active")

                    // enregistre la carte selectionnée
                    card_selected = +$(this).parent().data("card")
                    
                    // désactive les inputs
                    cardImageList.unbind("click")
                    cardImageList.unbind("mouseenter mouseleave")

                    cards.css({"transition":".5s all"})
                    $(this).next().css({"opacity": "0"})
                    card.css({"zIndex": "2"})

                    cards.css({"width": "14.5rem"})
                    // currentCard.css({"top": "0", "left": "0"})
                    
                    setTimeout(function() { // en attente de la réponse de l'autre joueur
                        cards.css({"transition":"1s all"})
                        cards.addClass("active")
                        
                        // setTimeout(function() {
                        //     enemyCards.addClass("reverse")
                        // }, 1000)

                        setTimeout(function() {
                            const enemyCards = cards.eq(0)
                            const enemyCard = enemyCards.children().eq(0)

                            enemyCard.css({"zIndex":"2"})
                            enemyCard.find(".card-image").css({"transform":"scaleX(-1)", "backgroundImage":`url(./assets/img/recto_${actions[card_enemy]}_red.png)`})

                        }, 300)
                        
                        setTimeout(function() {
                            const winMessage = $(".win-message")
                            if((card_selected == 0 && card_enemy == 1) || (card_selected == 1 &&  card_enemy == 2) || (card_selected == 2 && card_enemy == 0)) winMessage.text("Gagné !")
                            else if((card_selected == 0 && card_enemy == 2) || (card_selected == 1 && card_enemy == 0) || (card_selected == 2 && card_enemy == 1)) winMessage.text("Perdu !")
                            else winMessage.text("Ex æquo !")
                            winMessage.addClass("active")
                        }, 1000)

                    }, 500)
                })
            })
            
            // les cartes arrivent dans l'interface
            cards.css({"transition":"1s all"})
            cards.removeClass("preload")

        })
        
    })

    const click = new MouseEvent("click")
    $("button")[0].dispatchEvent(click)

})