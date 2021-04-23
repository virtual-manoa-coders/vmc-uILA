# Testing Checklist

Best practices for unit, integration, and acceptance testing.

## Unit Test Checklist

### TEST-UNIT-01: Each Collection has unit tests.

Collections are defined in the api/ directory. They are typically defined as a single Class instance that extend a base class such as "BaseCollection".

For each collection, there should be associated unit tests that check that all the fundamental operations on the Collection operate correctly for reasonable input values.

If an operation on the Collection has a relationship to another Collection, make sure to test these relationships. (In other words, if an operation implicitly creates another document in another collection, or requires the existance of another document in another collection, then test that these relationships are correct.)

## Integration Test Checklist

### TEST-INTEGRATION-01: Each Meteor Method has integration tests.

Meteor Methods are remote procedure calls that are invoked by the client and run on the server. They are found in an api/ subdirectory, in a file with the suffix "methods.ts".

Every Meteor Method in the system should be tested through an integration test. This test should invoke the Meteor Method, then check to see that the state of the system after invocation of the method is appropriate.

## Acceptance Test Checklist

### TEST-ACCEPTANCE-01: Each Page has an isDisplayed() acceptance test.

We use the "Page Object Model" to define one or more tests to exercise the behavior associated with the user interface.

For each page in the user interface, there should be an acceptance test that verifies that the page can be displayed successfully.


### TEST-ACCEPTANCE-02: Each Page component should have its page Id: `id='page-id'` in the root component

For each page that you've authored, you should place an id attribute in the root component that the page component returns.
```js
return (
        <Grid id='community-page' verticalAlign='middle' textAlign='center'>
          <Grid.Row>
            <Grid.Column>
              <Section>
...
```

### TEST-ACCEPTANCE-03: The root Page component with the test Id should be loaded quickly in headless, low computational power environment

The Github actions is using a headless ubuntu, which would take a long time to load heavy components. This would fail the testcafe check, even if the page is working on your machine.

#### For example, don't put the page Id in a video component
```js
 <Container id='landing-page' fluid textAlign='center' centered stackable>
            <video autoPlay muted loop id='myVideo'>
              <source src='/images/traffic.mp4' type="video/mp4"/>
            </video>
...
```
This code will fail the acceptance test on Github

#### Instead, put it in a component/tag that will be loaded instantly
```js
<div id='landing-page'>
          <Container fluid textAlign='center' centered stackable>
            <video autoPlay muted loop id='myVideo'>
              <source src='/images/traffic.mp4' type="video/mp4"/>
            </video>
...
```

### TEST-ACCEPTANCE-04: Each form has an acceptance test.

If a page has a form, there is an associated acceptance test to ensure that it behaves correctly.





