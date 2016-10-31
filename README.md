# Angular Tool for Team Management

(Made on top of angular-seed)

## Getting Started

Clone the angular-seed repository and install the dependencies:

### Clone angular-seed

```
git clone https://github.com/tony-blackie/team-management-ui.git
cd team-management-ui
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and angular framework code.  The tools help
us manage and test the application.

* We get the tools we depend upon via `npm`, the [node package manager][npm].
* We get the angular code via `bower`, a [client-side code package manager][bower].

We have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install
```

### Run the Application

We have preconfigured the project with a simple development web server and [grunt][gruntjs] tasks.

To run grunt tasks you need the Grunt command line interface.

Install this globally and you'll have access to the grunt command anywhere on your system.
```
npm install -g grunt-cli
```


### Starting the app in development mode

```
grunt up
```

Now browse to the app at `http://localhost:8080/`

### Running tests

```
karma start
```