import React from "react";
import {
    BrowserRouter as Router,
    Switch,
	Link,
	Route
} from "react-router-dom";
import Left from '../components/left'
import Header from '../components/header'
import Home from '../pages/home/home'
import Category from '../pages/category/category'
import Product from '../pages/product/product'
import ProductAddUpdate from '../pages/product/addUpdate'
import ProductDetail from '../pages/product/detail'
import ProductHome from '../pages/product/home'
import Role from '../pages/role/role'
import User from '../pages/user/user'
import Bar from '../pages/charts/bar'
import Line from '../pages/charts/line'
import Pie from '../pages/charts/pie'
import Mind from '../pages/learnTools/mind/index'
import MindDetail from '../pages/learnTools/mind/detail.jsx'
import Flow from '../pages/learnTools/flow'
import Koni from '../pages/learnTools/koni'
import NotFound from '../pages/notFound'

const routes = [
    {
		path: "/",
		component: Home,
		exact:true,
    },
    {
		path: "/home",
		component: Home,
	},
	{
		path: "/category",
		component: Category,
	},
	{
		path: "/product",
		component: ProductHome,
		exact:true,
		routes: [
			{
				path: "/product/addupdate",
				component: ProductAddUpdate
			},
			{
				path: "/product/detail",
				component: ProductDetail
			}
		]
	},
	{
		path: "/role",
		component: Role,
	},
	{
		path: "/user",
		component: User,
	},
	{
		path: "/charts",
		component: Bar,
		routes: [
			{
				path: "/charts/bar",
				component: Bar
			},
			{
				path: "/charts/line",
				component: Line
			},
			{
				path: "/charts/pie",
				component: Pie
			}
		]
	},
	{
		path: "/learnTools",
		component: Mind,
		routes: [
			{
				path: "/learnTools/mind",
				component: Mind,
				routes:[
					{
						path: "/learnTools/mind/detail",
						component:MindDetail
					}
				]
			},
			{
				path: "/learnTools/mind/detail",
				component: MindDetail
			},
			{
				path: "/learnTools/flow",
				component: Flow
			},
			{
				path: "/learnTools/koni",
				component: Koni
			}
		]
	},
];
function RouteWithSubRoutes(route) {
	return (
		<Route
			path={route.path}
			render={props => (
				<route.component {...props} routes={route.routes} />
			)}
		/>
	);
}

export default function PageRouters() {
	return (
		<Switch>
			{routes.map((route, i) => (
			<RouteWithSubRoutes key={i} {...route} />
			))}
		</Switch>
	);
}