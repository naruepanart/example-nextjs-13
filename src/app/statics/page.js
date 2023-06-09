import PageComponent from "@/components/PageComponent";
import React from "react";

export const metadata = {
	title: "Static",
};

const fetchPostData = async () => {
	const postUrl = `https://jsonplaceholder.typicode.com/posts`;
	const postResponse = await fetch(postUrl);
	const postData = await postResponse.json();
	return postData;
};

const page = async () => {
	const data = await fetchPostData();
	return (
		<>
			<h1>Static</h1>
			{data.map((data) => (
				<PageComponent key={data.id} posts={data} link={`/statics`} />
			))}
		</>
	);
};

export default page;
