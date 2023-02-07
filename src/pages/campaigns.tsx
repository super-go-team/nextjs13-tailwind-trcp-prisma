import { api } from "@/utils/server";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

import { Campaign } from "@prisma/client";
import {
  CampaignListItem,
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List
} from "../components";

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>("");
  const { data: list, refetch } = api.campaign.list.useQuery();

  const insertMutation = api.campaign.put.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteAllMutation = api.campaign.deleteAll.useMutation({
    onSuccess: () => refetch(),
  });

  const updateOneMutation = api.campaign.updateOne.useMutation({
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
    (item: Campaign) => {
      updateOneMutation.mutate({
        ...item,
        active: !item.active,
      });
    },
    [updateOneMutation]
  );

  return (
    <>
      <Head>
        <title>Campaign List</title>
        <meta name="description" content="Visit www.mosano.eu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>
          <CardContent>
            <CardHeader
              title="Campaign List"
              listLength={list?.length ?? 0}
              clearAllFn={clearAll}
            />
            <List>
              {list?.map((item) => (
                <CampaignListItem key={item.id} item={item} onUpdate={updateOne} />
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
