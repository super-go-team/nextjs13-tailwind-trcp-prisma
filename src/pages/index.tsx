import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { api } from "@/utils/server";

import {
  Card,
  CardContent,
  CardForm,
  CardHeader,
  List,
  ListItem,
} from "../components";
import { GroceryList } from "@prisma/client";

const Home: NextPage = () => {
  const [itemName, setItemName] = useState<string>("");

  // (V9) const { data: list, refetch } = trpc.useQuery(["findAll"]);
  const { data: list, refetch } = api.grocery.findAll.useQuery();
  // (V9) const insertMutation = trpc.useMutation(["insertOne"], {
  //   onSuccess: () => refetch(),
  // });
  const insertMutation = api.grocery.insertOne.useMutation({
    onSuccess: () => refetch(),
  });
  // (V9) const deleteAllMutation = trpc.useMutation(["deleteAll"], {
  //   onSuccess: () => refetch(),
  // });
  const deleteAllMutation = api.grocery.deleteAll.useMutation({
    onSuccess: () => refetch(),
  });
  // (V9) const updateOneMutation = trpc.useMutation(["updateOne"], {
  //   onSuccess: () => refetch(),
  // });
  const updateOneMutation = api.grocery.updateOne.useMutation({
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
    (item: GroceryList) => {
      updateOneMutation.mutate({
        ...item,
        checked: !item.checked,
      });
    },
    [updateOneMutation]
  );

  return (
    <>
      <Head>
        <title>Grocery List</title>
        <meta name="description" content="Visit www.mosano.eu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Card>
          <CardContent>
            <CardHeader
              title="Grocery List"
              listLength={list?.length ?? 0}
              clearAllFn={clearAll}
            />
            <List>
              {list?.map((item) => (
                <ListItem key={item.id} item={item} onUpdate={updateOne} />
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
