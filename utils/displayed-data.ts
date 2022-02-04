export type DisplayedDataType = {
    title: string;
    name: string;
    type: string;
}[];

export const displayedData: DisplayedDataType = [
    {
        title: "напряженности электрического поля Ez (проекция на ось Z)",
        name: "Ez",
        type: "Ez",
    },
    {
        title: "напряженности магнитного поля Hy (проекция на ось Y)",
        name: "Hy",
        type: "Hy",
    },
    {
        title: "проекции на ось X напряженности магнитного поля (Hx)",
        name: "Hx",
        type: "Hx",
    },
    {
        title: "плотности энергии электромагнагнитного поля",
        name: "w",
        type: "Energy",
    },
];