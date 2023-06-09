import PageComponent from "@/components/PageComponent";
import React from "react";

export const metadata = {
	title: "ISR",
};

const fetchPostData = async () => {
	const url = `https://jsonplaceholder.typicode.com/posts`;
	const options = { next: { revalidate: 60 } };
	const response = await fetch(url, options);
	return response.json();
};

const page = async () => {
	const data = await fetchPostData();
	return (
		<>
			<h1>ISR</h1>
			{data.map((data) => (
				<PageComponent key={data.id} posts={data} link={`/dynamics/isr`} />
			))}
		</>
	);
};

export default page;
