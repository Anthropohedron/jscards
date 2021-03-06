// CardDragger class
// -----------------
// This manages a card being dragged around the playing field. It mostly
// manages mouse events.

function CardDragger(game) {
  this.game = game;
  this.handlers = {
    mousedown: this.mouseDown.bind(this),
    mousemove: this.mouseMove.bind(this),
    mouseup: this.mouseUp.bind(this),
    click: this.click.bind(this),
    dblclick: this.dblClick.bind(this)
  };
}

CardDragger.prototype = {

  dragCard: null,
  cX: 0,
  cY: 0,
  oldZ: 0,

  observeElement: function(element) {
    $(element).on(this.handlers);
  },

  isAnimating: function() {
    return Card.running;
  },

  mouseDown: function(evt) {
    var element = evt.target;
    evt.preventDefault();
    evt.stopPropagation();
    if (this.isAnimating()) return;
    if (element) {
      var dragCard =
        this.game.pickCard(Card.findParentCard(element), this);
      this.dragCard = dragCard;
      if (dragCard!=null) {
        dragCard.highlight(false);
        this.cX = evt.pageX - dragCard.rect.left;
        this.cY = evt.pageY - dragCard.rect.top;
        this.oldZ = dragCard.getZ();
        dragCard.setZ(this.oldZ + 150);
        //return true;
      } else {
        this.dragCard = null;
        //return false;
      }
    }
    return false;
  },

  mouseMove: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.isAnimating()) return;
    if (this.dragCard!=null) {
      this.dragCard.moveTo(evt.pageX - this.cX, evt.pageY - this.cY);
      this.game.movedCard(evt, this.dragCard, this);
      //return true;
    }
    return false;
  },

  mouseUp: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    if (this.isAnimating()) return;
    if (this.dragCard!=null) {
      var card = this.dragCard;

      this.dragCard = null;
      card.setZ(this.oldZ);
      this.game.dropCard(evt, card, this);
      //return true;
    }
    return false;
  },

  click: function(evt) {
    var element = evt.target;
    evt.preventDefault();
    evt.stopPropagation();
    if (this.isAnimating()) return;
    var card = Card.findParentCard(element);
    if (card!=null) {
      this.game.clickCard(card, this);
    }
    return false;
  },

  dblClick: function(evt) {
    var element = evt.target;
    evt.preventDefault();
    evt.stopPropagation();
    if (this.isAnimating()) return;
    var card = Card.findParentCard(element);
    if (card!=null) {
      this.game.dblclickCard(card, this);
    }
    return false;
  }

};

