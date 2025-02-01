import React, { useContext, useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { UrlContext } from "@/context";
import { getUrls } from "@/db/apiUrls";
import { getClicks } from "@/db/apiClicks";
import LinkCard from "@/components/LinkCard";
import CreateLink from "@/components/CreateLink";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useContext(UrlContext);

  const {
    loading,
    data: urls,
    error,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);
  
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicks,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) => {
    return url.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-3">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4 text-left">
        <Card>
          <CardHeader>
            <CardTitle>Links created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl pl-3">{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl pl-3">{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="font-extrabold text-3xl">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error.message} />}

      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  );
}

export default Dashboard;
