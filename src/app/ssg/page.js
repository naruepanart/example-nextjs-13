import PageComponent from "@/components/PageComponent";
import axios from "axios";
import React from "react";

export const metadata = {
	title: "SSG",
};

const fetchPostData = async () => {
	const apiUrl = `https://jsonplaceholder.typicode.com/posts`;
	const response = await axios.get(apiUrl);
	return response.data;
};

const page = async () => {
	const data = await fetchPostData();
	return (
		<>
			<h1>SSG</h1>
			{data.map((data) => (
				<PageComponent key={data.id} posts={data} />
			))}
		</>
	);
};

export default page;
