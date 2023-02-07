import { api } from "@/utils/server";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

import { Advertiser } from "@prisma/client";
import {
  AdvertiserListItem,
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List
} from "../components";

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>("");
  const { data: list, refetch } = api.advertiser.list.useQuery();

  const { data: starwars } = api.advertiser.starwars.useQuery({id: 7});
  console.log('starwars', starwars)

  const insertMutation = api.advertiser.put.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteAllMutation = api.advertiser.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const updateOneMutation = api.advertiser.patch.useMutation({
    onSuccess: () => refetch(),
  });

  const insertOne = useCallback(() => {
    if (itemName === "") return;

    insertMutation.mutate({
      title: itemName,
    });

    setItemName("");
  }, [itemName, insertMutation]);

  const clearAll = useCallback(() => {
    if (list?.length) {
      deleteAllMutation.mutate({
        ids: list.map((item) => item.id),
      });
    }
  }, [list, deleteAllMutation]);

  const updateOne = useCallback(
    (item: Advertiser) => {
      updateOneMutation.mutate({
        ...item,
      });
    },
    [updateOneMutation]
  );

  return (
    <>
      <Head>
        <title>Advertiser List</title>
        <meta name="description" content="Visit www.mosano.eu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>
          <CardContent>
            <CardHeader
              title="Advertiser List"
              listLength={list?.length ?? 0}
              clearAllFn={clearAll}
            />
            <List>
              {list?.map((item) => (
                <AdvertiserListItem key={item.id} item={item} onUpdate={updateOne} />
              ))}
            </List>
          </CardContent>
          <CardForm
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            submit={insertOne}
          />
        </Card>
      </main>
    </>
  );
};

export default Home;
