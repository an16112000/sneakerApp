export const headerOptions = [
    {
        id: 1,
        title: 'Jordan',
        children: [
            {
                id: 1,
                title: 'Jordan',
                path: 'jordan'
            },
            {
                id: 2,
                title: 'Jordan Low',
                path: 'Jordan+Low'
            },
            {
                id: 3,
                title: 'Jordan Mid',
                path: 'Jordan+Mid'
            },
            {
                id: 4,
                title: 'Jordan High',
                path: 'Jordan+High'
            },
        ]
    },
    {
        id: 2,
        title: 'Dunk',
        children: [
            {
                id: 1,
                title: 'Dunk',
                path: 'Dunk'
            },
            {
                id: 2,
                title: 'Dunk Low',
                path: 'Dunk+Low'
            },
            {
                id: 3,
                title: 'Dunk Mid',
                path: 'Dunk+Mid'
            },
            {
                id: 4,
                title: 'Dunk High',
                path: 'Dunk+High'
            },
        ]
    },
    {
        id: 3,
        title: 'Air Force 1',
        children: [
            {
                id: 1,
                title: 'Air Force 1',
                path: 'Air+Force+1'
            },
            {
                id: 2,
                title: 'Air Force 1 Low',
                path: 'Air+Force+1+Low'
            },
            {
                id: 3,
                title: 'Air Force 1 Mid',
                path: 'Air+Force+1+Mid'
            },
            {
                id: 4,
                title: 'Air Force 1 High',
                path: 'Air+Force+1+High'
            },
        ]
    }
]

export const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });