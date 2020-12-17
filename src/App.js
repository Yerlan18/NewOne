import react from 'react'
import Products from "./components/Components";
import Hello from './Hello'
import Filter from "./components/Filter";
import Cart from "./components/Cart";


class App extends react.Component {
    constructor() {
        super();
        this.state = {
            products: Hello.products,
            cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
            size: "",
            sort: ""
        };
    }

    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({cartItems: cartItems.filter(x=> x._id !== product._id)})
        localStorage.removeItem("cartItems", JSON.stringify(cartItems));
    }

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach(item => {
            if(item._id === product._id){
                item.count++;
                alreadyInCart = true;
            }
        });
        if(!alreadyInCart) {
            cartItems.push({...product, count: 1})
        }
        this.setState({cartItems});
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };



    sortProducts = (event) => {
        const sort = event.target.value;
        this.setState((state) => ({
            sort: sort,
            products: this.state.products.slice().sort((a, b) =>
            sort === "Lowest"
                    ? a.price > b.price
                    ? 1
                    : -1
                    : sort === "Highest"
                    ? a.price < b.price
                        ? 1
                        : -1
                    : a._id > b._id
                        ? 1
                        : -1
            ),
        }))
    }


    filterProducts = (size) => {
        if (size.target.value === "") {
            this.setState({size: size.target.value, products: Hello.products})
        } else {
            this.setState({
                size: size.target.value,
                products: Hello.products.filter(product => product.availableSizes.indexOf(size.target.value) >= 0)
            })
        }
    }

    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href="/">React Shopping Cart</a>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <Filter count={this.state.products.length}
                                    size={this.state.size} sort={this.state.sort}
                                    filterProducts={this.filterProducts}
                                    sortProducts={this.sortProducts}></Filter>
                            <Products products={this.state.products} addToCart={this.addToCart}></Products>
                        </div>
                        <div className="sidebar">
                            <Cart removeFromCart={this.removeFromCart} cartItems={this.state.cartItems} />
                        </div>
                    </div>
                </main>
                <footer>
                    All right is reserved.
                </footer>
            </div>
        );
    }
}

export default App;
