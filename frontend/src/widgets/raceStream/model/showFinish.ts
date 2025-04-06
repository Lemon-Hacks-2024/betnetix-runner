import { h, inject, Ref } from "vue";
import { Modal, Table } from "ant-design-vue";

import { useTexts } from "@/app/locale/model";
import { Group } from "@/entities/groups";

interface Data {
  player_id: number;
  position: number;
  distance: number;
  race_time: number;
  finish_time: number;
  current_speed: number;
}

export const useFinish = () => {
  const group = inject<Ref<Group>>("dataGroup")!;

  const getName = (id: string) => {
    return group.value.players?.find((p) => p.id == id)?.name ?? "—";
  };

  const columns = [
    {
      title: "Место",
      dataIndex: "position",
      key: "position",
      align: "center",
    },
    {
      title: "Участник",
      dataIndex: "player_id",
      key: "player_id",
      customRender: ({ text }: { text: string }) => getName(text),
    },
    {
      title: "Время гонки",
      dataIndex: "race_time",
      key: "race_time",
      customRender: ({ text }: { text: number }) => `${text.toFixed(3)} сек`,
    },
    {
      title: "Средняя скорость",
      dataIndex: "current_speed",
      key: "current_speed",
      customRender: ({ text }: { text: number }) =>
        `${(100 / text).toFixed(2)} м/с`,
    },
  ];

  const showFinish = (data: Data[]) => {
    const { $t } = useTexts();

    Modal.info({
      title: $t.value.main.raceOver,
      width: 600,
      content: h(Table, {
        columns,
        dataSource: data,
        pagination: false,
        rowKey: "player_id",
        bordered: true,
        size: "small",
      }),
      onOk() {
        console.log("ok");
      },
    });
  };

  return {
    showFinish,
  };
};
