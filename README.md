# Release Readiness Dashboard
Dashboards for tracking [Release Statuses of Mozillian Awesomeness](https://release-dash.paas.allizom.org).<br>
More awesome *(and possibly unstable)* new features on [the staging site](http://release-dash.williecheong.com).<br>
Change logs, progress updates and latest developments on [this spreadsheet](https://docs.google.com/spreadsheet/ccc?key=0ApNDjYXWm5JndDFwLWVlM1BPR3dBdjE1ZVdfWlBwR1E&usp=sharing).


## Deployment        
#### Requirements
- Standard Web Stack: Apache, MySQL, PHP 5.3 and above
- For deployment on local machine, try LAMP, [MAMP](http://www.mamp.info/en/downloads/) or [WAMP](http://www.wampserver.com/en/). 

#### Configuration
- Define *production*, *staging* and *development* environments in `/index.php`
- Database credentials for *development* in `/application/config/database.php`
- Landing page (base_url) for *development* in `/application/config/config.php`
- Configuration for other environments in `/application/config/[environment]/______.php`
- If necessary, modify white-listed dashboard administrators in `/assets/sql/schema.sql`

#### Instructions
1. Clone the repository into the web directory
2. Set up a new MySQL database service on the machine
3. Define database credentials as specified in Configuration above
4. Load the database schema and initial data from `/assets/sql/schema.sql`
5. Done: RRDashboard is now live.


## URL Walkthrough
#### Landing page
- Accessed through "/" or "/overview" 
- Provides an overview of all active versions
- Executes from: `/application/controllers/overview.php/index`
- [More details...](http://blog.williecheong.com/running-with-the-train/)

#### Version page
- Accessed through "/for/[product]/[version]"
- Provides a detailed view of a specific version
- Executes from: `/application/controllers/watch.php/single`
- [More details about groups of queries...](http://blog.williecheong.com/groups-of-queries/)
- [More details about group rules...](http://blog.williecheong.com/release-readiness-dashboardrules-for-scoring/)

#### Administrator login page
- Accessed through "/admin"
- Allows a whitelisted user to sign in using Persona
- Executes from: `/application/controllers/admin.php/index`

#### Qb query builder page
- Accessed through "/admin/easy_qb"
- Translates Bugzilla URLs into Qb queries
- Executes from: `/application/controllers/admin.php/easy_qb`
- [More details...](http://blog.williecheong.com/release-readiness-dashboardqb-query-builder/)

#### User guide page
- Accessed through "/admin/help" or "/help"
- Read-able manual to help with getting started
- Executes from: `/application/controllers/admin.php/help`

#### Update components
- Accessed through "/admin/update_components"
- Grabs product components from Bugzilla and updates database
- Executes from: `/application/controllers/admin.php/update_components`

#### Update cycle
- Accessed through "/admin/update_cycle"
- Checks for new cycle and updates accordingly
- Automatically called when a current cycle is not found
- Executes from: `/application/controllers/admin.php/update_cycle`
- [More details...](http://blog.williecheong.com/running-with-the-train/)

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
