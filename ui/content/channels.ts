interface IChannel {
  title: string;
  subtitle: string;
  description: string;
}

const channelsData: IChannel[] = [
  {
    title: 'Radio Free Mobile',
    subtitle: 'To entertain as well as to inform',
    description:
      'Radio Free Mobile is an independent research producer specialising in the digital and mobile ecosystem. RFM produces an in depth research product that helps clients to understand and evaluate the players in the digital ecosystem. This product is available on a subscription basis and is currently sold to a range of some of the largest players in the digital ecosystem. RFM has subscribers in the handset, telecom operator, financial investment, semiconductor and internet industries.',
  },
  {
    title: 'Channel test',
    subtitle: 'Test Subtitle',
    description: 'This is a test channel sdfdsfdsf',
  },
];

const content: Record<string, Array<IChannel>> = {
  channels: channelsData,
  cards: [],
  games: [],
};

export { channelsData, content };
export type { IChannel };
