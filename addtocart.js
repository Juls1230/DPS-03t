const product = [
    {
        id: 0,
        image: 'img/catalog/Atari.jpg',
        title: 'Atari video computer system.',
        price: 300,
    },
    {
        id: 1,
        image: 'img/catalog/Boba-fett-starship.jpg',
        title: 'Boba fett´s starship',
        price: 70,
    },
    {
        id: 2,
        image: 'img/catalog/city.jpg',
        title: '4X4 Off-road ambulance rescue',
        price: 36,
    },
    {
        id: 4,
        image: 'img/catalog/Disney-Castle.jpg',
        title: 'Mini Disney castle',
        price: 62,
    },
    {
        id: 5,
        image: 'img/catalog/DOTS.jpg',
        title: 'Pen Holder',
        price: 35,
    },
    {
        id: 6,
        image: 'img/catalog/Dream-village.jpg',
        title: 'Dream Village',
        price: 55,
    },
    {
        id: 7,
        image: 'img/catalog/Fox-Lodge.jpg',
        title: 'Fox Lodge',
        price: 40,
    },
    {
        id: 8,
        image: 'img/catalog/Fun-creativity.jpg',
        title: 'Fun Creativity 12-in-1',
        price: 25,
    },
    {
        id: 9,
        image: 'img/catalog/Imperium-Dragon.jpg',
        title: 'Imperium Dragon Hunter Hound',
        price: 40,
    },
    {
        id: 10,
        image: 'img/catalog/Jeep.jpg',
        title: 'Jeep Wrangler',
        price: 85,
    },
    {
        id: 11,
        image: 'img/catalog/Mandalorian-Starfighter.jpg',
        title: 'The Mandalorian´s N-1 Starfighter',
        price: 82,
    },
    {
        id: 12,
        image: 'img/catalog/Spiderman-final-battle.jpg',
        title: 'Spide-rman final battle',
        price: 175,
    },
    {
        id: 13,
        image: 'img/catalog/Tornado-plane.jpg',
        title: 'Tail´s workshop and tornado plane',
        price: 100,
    }
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box single-item'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button class='catbutton' onclick='addtocart("+(i++)+")'>Agregar</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(){
    let j = 0, total=0;
    document.getElementById("count").innerHTML=cart.length;
    if(cart.length==0){
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ "+0+".00";
        document.getElementById("comprarboton").innerHTML = "<button class='buybutton' type='submit' disabled style='background: gray;'>Comprar</button>";
    }
    else{
        document.getElementById("cartItem").innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total=total+price;
            document.getElementById("total").innerHTML = "$ "+total+".00";
            return(
                `<div class='cart-item'>
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
                "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
            );
        }).join('');
        document.getElementById("comprarboton").innerHTML = "<button class='buybutton' onclick='envCom(cart);'>Comprar</button>";
    }
    

}
function envCom(cart){
    
    localStorage.setItem("productos",JSON.stringify(cart));

    window.location.href = "comprar.html";

}
/****************Paginacion**************/


(function($) {
	var pagify = {
		items: {},
		container: null,
		totalPages: 1,
		perPage: 3,
		currentPage: 0,
		createNavigation: function() {
			this.totalPages = Math.ceil(this.items.length / this.perPage);

			$('.pagination', this.container.parent()).remove();
			var pagination = $('<div class="pagination"></div>').append('<a class="nav prev disabled paginbutton fa-solid" data-next="false"><</a>');

			for (var i = 0; i < this.totalPages; i++) {
				var pageElClass = "page";
				if (!i)
					pageElClass = "page current";
				var pageEl = '<a class="paginbutton ' + pageElClass + '" data-page="' + (
				i + 1) + '">' + (
				i + 1) + "</a>";
				pagination.append(pageEl);
			}
			pagination.append('<a class="paginbutton nav next fa-solid" data-next="true">></a>');

			this.container.after(pagination);

			var that = this;
			$("body").off("click", ".nav");
			this.navigator = $("body").on("click", ".nav", function() {
				var el = $(this);
				that.navigate(el.data("next"));
			});

			$("body").off("click", ".page");
			this.pageNavigator = $("body").on("click", ".page", function() {
				var el = $(this);
				that.goToPage(el.data("page"));
			});
		},
		navigate: function(next) {
			// default perPage to 5
			if (isNaN(next) || next === undefined) {
				next = true;
			}
			$(".pagination .nav").removeClass("disabled");
			if (next) {
				this.currentPage++;
				if (this.currentPage > (this.totalPages - 1))
					this.currentPage = (this.totalPages - 1);
				if (this.currentPage == (this.totalPages - 1))
					$(".pagination .nav.next").addClass("disabled");
				}
			else {
				this.currentPage--;
				if (this.currentPage < 0)
					this.currentPage = 0;
				if (this.currentPage == 0)
					$(".pagination .nav.prev").addClass("disabled");
				}

			this.showItems();
		},
		updateNavigation: function() {

			var pages = $(".pagination .page");
			pages.removeClass("current");
			$('.pagination .page[data-page="' + (
			this.currentPage + 1) + '"]').addClass("current");
		},
		goToPage: function(page) {

			this.currentPage = page - 1;

			$(".pagination .nav").removeClass("disabled");
			if (this.currentPage == (this.totalPages - 1))
				$(".pagination .nav.next").addClass("disabled");

			if (this.currentPage == 0)
				$(".pagination .nav.prev").addClass("disabled");
			this.showItems();
		},
		showItems: function() {
			this.items.hide();
			var base = this.perPage * this.currentPage;
			this.items.slice(base, base + this.perPage).show();

			this.updateNavigation();
		},
		init: function(container, items, perPage) {
			this.container = container;
			this.currentPage = 0;
			this.totalPages = 1;
			this.perPage = perPage;
			this.items = items;
			this.createNavigation();
			this.showItems();
		}
	};

	// stuff it all into a jQuery method!
	$.fn.pagify = function(perPage, itemSelector) {
		var el = $(this);
		var items = $(itemSelector, el);

		// default perPage to 5
		if (isNaN(perPage) || perPage === undefined) {
			perPage = 3;
		}

		// don't fire if fewer items than perPage
		if (items.length <= perPage) {
			return true;
		}

		pagify.init(el, items, perPage);
	};
})(jQuery);

$(".container").pagify(6, ".single-item");
