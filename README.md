# Release Readiness Dashboard
Dashboards for tracking [Release Statuses of Mozillian Awesomeness](https://release-dash.paas.allizom.org).<br>
More awesome *(and possibly unstable)* new features on [the staging site](http://release-dash.williecheong.com).<br>
Change logs, progress updates and latest developments on [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0ApNDjYXWm5JndDFwLWVlM1BPR3dBdjE1ZVdfWlBwR1E&usp=sharing).

## URL Walkthrough
#### Landing page
    Provides an overview of all active versions
    Accessed through ```/``` or `/overview` 
    Code starts executing from: 
        - /application/controllers/overview.php/index

#### Version page
    - Provides a detailed view of a specific version
    - Accessed through `/for/[product_tag]/[version_tag]`  
    - Code starts executing from:
        - /application/config/routes.php
        - /application/controllers/watch.php/single

#### Administrator login page
    - Allows a whitelisted user to sign in using Persona
    - Accessed through `/admin`
    - Code starts executing from:
        - /application/controllers/admin.php/index

#### Qb query builder page
    - Translates Bugzilla URLs into Qb queries
    - Accessed through `/admin/easy_qb`
    - Code starts executing from:
        - /application/controllers/admin.php/easy_qb

#### User guide page
    - A read-able manual to help with getting started
    - Accessed through `/admin/help` or `/help`
    - Code starts executing from:
        - /application/config/routes.php
        - /application/controllers/admin.php/help

#### Update components
    - Grabs product components from Bugzilla and updates database
    - Accessed through `/admin/update_components`
    - Code starts executing from:
        - /application/controllers/admin.php/update_components


## Deployment        
#### Requirements
- Standard Web Stack: Apache, MySQL, PHP 5.3 and above
- For deployment on local machine, try LAMP, [MAMP](http://www.mamp.info/en/downloads/) or [WAMP](http://www.wampserver.com/en/). 

#### Configuration
- Define *production*, *staging* and *development* environments in `/index.php`
- Database credentials for *development* in `/application/config/database.php`
- Landing page (base_url) for *development* in `/application/config/config.php`
- Configuration for other environments in `/application/config/[environment]/______.php`
- If neccessary, modify white-listed dashboard administrators in `/assets/sql/schema.sql`

#### Instructions
1. Clone the repository into the web directory
2. Set up a new MySQL database service on the machine
3. Define database credentials as specified in Configuration above
4. Load the database schema and initial data from `/assets/sql/schema.sql`
5. Done: RRDashboard is now live.


## Testing
To be continued


## Troubleshoot
To be continued<br>

Reach out to [Willie Cheong](http://williecheong.com) for undocumented problems.


## References
- [CodeIgniter](http://ellislab.com/codeigniter): Server side PHP framework
- [CI Blades](https://github.com/laperla/codeigniter-Blade): Laravel style blade templating on CodeIgniter
- [CI RestServer](https://github.com/philsturgeon/codeigniter-restserver): Support for REST APIs on CodeIgniter
- [Qb](https://github.com/klahnakoski/qb): Qb queries on Bugzilla's ElasticSearch clusters
- [Persona](https://developer.mozilla.org/en-US/Persona): Email authentication service
- [D3-Rickshaw](http://code.shutterstock.com/rickshaw/): Javascript-based graphing tool
- [Twitter Bootstrap](http://getbootstrap.com/getting-started/): Beautiful user interfaces
- [Spectrum](http://bgrins.github.io/spectrum/): Beautiful colourpicker widget
- [Font Awesome](http://fontawesome.io/): Beautiful HTML icons
- [Gridster](http://gridster.net/): Beautiful grid boxes


## License
[Mozilla Public Liscense v2.0](LICENSE)
