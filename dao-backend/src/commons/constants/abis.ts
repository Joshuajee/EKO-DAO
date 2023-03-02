export const ADMIN_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'getAdmin',
    outputs: [
      {
        internalType: 'enum LibAdmin.Roles',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'isAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'isSuperAdmin',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
    ],
    name: 'removeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_admin',
        type: 'address',
      },
      {
        internalType: 'enum LibAdmin.Roles',
        name: '_role',
        type: 'uint8',
      },
    ],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const COHORT_FACTORY_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_startDate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endDate',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_size',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_commitment',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
    ],
    name: 'newCohort',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const COHORT_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'cohort',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'size',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'commitment',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'enum Cohort.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'studentsCount',
            type: 'uint256',
          },
        ],
        internalType: 'struct Cohort.CohortDetails',
        name: '',
        type: 'tuple',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cohorts',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'startDate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'size',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'commitment',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'enum Cohort.Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'studentsCount',
            type: 'uint256',
          },
        ],
        internalType: 'struct Cohort.CohortDetails[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_cohort',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_stableCoin',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_ekoNft',
        type: 'address',
      },
    ],
    name: 'initCohort',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const CROWDFUNDING_FACET_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'projectIndex',
        type: 'uint256',
      },
    ],
    name: 'ProjectDoesNotExist',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'projectAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'contributedAmount',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'contributor',
        type: 'address',
      },
    ],
    name: 'ContributionReceived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'projectAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountWithdrawn',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'withdrawer',
        type: 'address',
      },
    ],
    name: 'FundWithdrawn',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'projectContractAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'title',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'desc',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'targetFund',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'minContribution',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endDate',
        type: 'uint256',
      },
    ],
    name: 'ProjectStarted',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'IsUserADonor',
    outputs: [
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'adminWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_projectTopic',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_targetFund',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_minimumDonation',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: '_acceptedCurrency',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_projectPeriod',
        type: 'uint256',
      },
    ],
    name: 'createCampaign',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_tokenAmount',
        type: 'uint256',
      },
    ],
    name: 'donate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'donorWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'X',
        type: 'uint256',
      },
    ],
    name: 'getLastXProjectDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'projectAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'targetFund',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDonationRecieved',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minimumDonation',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountWithdrawn',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'projectTopic',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'noOfDonors',
            type: 'uint256',
          },
          {
            internalType: 'enum Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address[]',
            name: 'donors',
            type: 'address[]',
          },
        ],
        internalType: 'struct Database.ProjectState[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'getProjectBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_projectIndex',
        type: 'uint256',
      },
    ],
    name: 'getProjectDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'admin',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'projectAddress',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'targetFund',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'totalDonationRecieved',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'minimumDonation',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amountWithdrawn',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fundBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endDate',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'projectTopic',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'noOfDonors',
            type: 'uint256',
          },
          {
            internalType: 'enum Status',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'address[]',
            name: 'donors',
            type: 'address[]',
          },
        ],
        internalType: 'struct Database.ProjectState',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'returnProjectsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
