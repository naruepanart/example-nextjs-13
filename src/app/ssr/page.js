import PageComponent from "@/components/PageComponent";
import axios from "axios";
import React from "react";

export const metadata = {
	title: "SSR",
};

const fetchPostData = async () => {
	const apiUrl = `https://jsonplaceholder.typicode.com/posts`;
	const response = await axios.get(apiUrl, { cache: "no-store" });
	return response.data;
};

const page = async () => {
	const data = await fetchPostData();
	return (
		<>
			<h1>SSR</h1>
			{data.map((data) => (
				<PageComponent key={data.id} posts={data} />
			))}
		</>
	);
};

export default page;
