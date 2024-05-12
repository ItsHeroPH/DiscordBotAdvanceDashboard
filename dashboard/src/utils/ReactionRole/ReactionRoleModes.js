export default [
    {
        name: "Normal",
        description: "Reacting gives the role, Unreacting removes the role",
        type: 1
    },
    {
        name: "Unique",
        description: "Only one role can be obtain",
        type: 2
    },
    {
        name: "Verify",
        description: "Reacting gives the role, Unreacting doesn't remove the role",
        type: 3
    },
    {
        name: "Drop",
        description: "Reacting removes the role, Unreacting doesn't give the role",
        type: 4
    },
    {
        name: "Reversed",
        description: "Reacting removes the role, Unreacting give the role",
        type: 5
    },
    {
        name: "Binding",
        description: "Gives the role, but doesn't swap to the other role and you can't remove it",
        type: 6
    }
]