/**
 * qCart v1.0
 * 
 * JavaScript Cart Library with jQuery & Bootstrap
 */
window.onload = () => {
    if(typeof jQuery === "undefined"){
        alert("QCart Error (Requirement)\n\njQuery is not installed. Please install it first with a minimum requirement of version 3.6");
    }

    if(typeof bootstrap === "undefined"){
        alert("QCart Error (Requirement)\n\nBootstrap is not installed. Please install it first with a minimum requirement of version 5.2");
    }
}

class QCart {

    constructor(){
        this.lsdName    = "qcartData";
        this.lscName    = "qcartCounter";
        this.dev        = "QCart";
    }

    init(opts = false){
        /**
         * Checking localStorage
         */
        if(localStorage.getItem(this.lsdName) === null && localStorage.getItem(this.lscName) === null){
            localStorage.setItem(this.lsdName, "[]");
            localStorage.setItem(this.lscName, "{amount: 0, qty: 0}");
        }
        
        if(localStorage.getItem(this.lsdName).length < 1 && localStorage.getItem(this.lscName).length < 1){
            localStorage.setItem(this.lsdName, "[]");
            localStorage.setItem(this.lscName, "{amount: 0, qty: 0}");
        }

        /**
         * Load language
         */
        var langSet = (opts && typeof opts.lang !== "undefined" ? opts.lang : "en");
        var langOut = {};

        $.ajax({
            url: "/src/js/qcart_lang.json",
            type: "GET",
            dataType: "JSON",
            async: false,
            success: function(res) {
                langOut = res[langSet] || {};
            },
            error: function(xhr, status, error) {
                console.error("Error fetching language data:", status, error);
            }
        });

        /**
         * Rendering QCart HTML element
         */
        $(".qcart-count").html(JSON.parse(localStorage.getItem(this.lsdName)).length);
        $(".qcart-button")
            .attr("data-bs-toggle", "modal")
            .attr("data-bs-target", ".qcart-modal");
        
        $("body").prepend(`
            <div class="modal fade qcart-modal" tabindex="-1" aria-labelledby="qcart-modalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5 qcart-modalLabel"><i class="ri-shopping-cart-line"></i>&nbsp; ${langOut.cartModalTitle}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer justify-content-between">
                            <div class='qcart-credit'>Powered by <b>${this.dev}</b></div>
                            <button type="button" class="btn btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    store(){
        //
    }

    checkout(){
        //
    }

    clear(){
        localStorage.removeItem(this.lsdName);
        localStorage.removeItem(this.lscName);
        localStorage.setItem(this.lsdName, "[]");
        localStorage.setItem(this.lscName, "{amount: 0, qty: 0}");
    }

    /**
     * Helper
     */

}

const QCART = new QCart();

/**
 * QCart Events & Listeners
 */