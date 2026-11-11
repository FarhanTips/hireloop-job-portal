import React from 'react';

const BrowseJobsPage = async ({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const search = await searchParams;
    console.log(search);
    const query = new URLSearchParams(search as Record<string, string>).toString();
    console.log("query", query);
    return (
        <div>
            
        </div>
    );
};

export default BrowseJobsPage;
