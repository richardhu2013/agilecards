This task is implemented with node.js so to test this solution, please make sure node is installed.

checkout the source code, then go inside, do the following:

npm install

To verify that the whole module works, simply run:

node index

To test:
./q.sh test/agile_card_create_test.js
./q.sh test/agile_cards_iteration_test.js

The development has strictly followed the TDD procedure so the tests in two test files have tried to cover all the edge conditions and validations, but I understand that it is possible there are still conditions uncovered.

The iteration should actually be a class design if the board need to support multiple iterations, but in my implementation, I just try to demonstrate how to handle those API interfaces.

Please refer to two screenshots to get idea what the test looks like.

