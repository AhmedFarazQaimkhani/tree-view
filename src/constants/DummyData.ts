// Components
import type {TreeDataTypes} from 'types/TreeView';

// Dummy Data
export const DummyData: TreeDataTypes[] = [
  {
    title: 'Phone',
    data: [
      {
        title: 'Apple',
        data: [
          {
            title: 'Iphone 14',
            data: [
              {
                title: '128 GB',
                availability: '200+ Devices',
              },
              {
                title: '256 GB',
                availability: '150+ Devices',
              },
              {
                title: '512 GB',
                availability: '10+ Devices',
              },
              {
                title: '1 TB',
                availability: '5+ Devices',
              },
            ],
          },
          {
            title: 'Iphone 15 pro',
            data: [
              {
                title: '128 GB',
                availability: '5+ Devices',
              },
              {
                title: '256 GB',
                availability: '50+ Devices',
              },
              {
                title: '512 GB',
                availability: '60 Devices',
              },
              {
                title: '1 TB',
                availability: '3 Devices',
              },
            ],
          },
        ],
      },
      {
        title: 'Samsung',
        data: [
          {
            title: 'S24',
            data: [
              {
                title: '128 GB',
                availability: '245+ Devices',
              },
              {
                title: '256 GB',
                availability: '112+ Devices',
              },
            ],
          },
          {
            title: 'Galaxy Z',
            data: [
              {
                title: '256 GB',
                availability: '40 Devices',
              },
              {
                title: '512 GB',
                availability: '34 Devices',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Computers',
    availability: '20+ MacBooks, 400+ PCs',
    data: [
      {
        title: 'MacBook',
        data: [
          {
            title: '512 GB',
            availability: '15',
          },
          {
            title: '1 TB',
            availability: '6',
          },
        ],
      },
      {
        title: 'PCs',
        data: [
          {
            title: '512 GB',
            availability: '250',
          },
          {
            title: '1 TB',
            availability: '158',
          },
        ],
      },
    ],
  },
  {
    title: 'Watches',
    availability: '140+ Apple Watches, 350+ Samsung Watches',
    data: [
      {
        title: 'Apple',
        data: [
          {
            title: 'Series 7',
            availability: '80',
          },
          {
            title: 'Series 9',
            availability: '65',
          },
        ],
      },
      {
        title: 'Samsung',
        data: [
          {
            title: 'Galaxy Watch 4',
            availability: '180',
          },
          {
            title: 'Galaxy Watch 5',
            availability: '90',
          },
          {
            title: 'Galaxy Watch 6',
            availability: '75',
          },
        ],
      },
    ],
  },
  {
    title: 'Tvs',
    availability: '90+ Apple Tvs, 00+ Samsung Tvs',
    data: [
      {
        title: 'Samsung',
        availability: '90',
      },
      {
        title: 'Apple',
        availability: '90',
      },
    ],
  },
];
