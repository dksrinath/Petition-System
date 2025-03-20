const petitionsData = [
    {
      id: 1,
      title: "Fix potholes on Main Street",
      description: "There are numerous dangerous potholes on Main Street that need immediate attention.",
      department: "Infrastructure",
      priority: "High",
      status: "In Progress",
      createdAt: "2025-02-15T14:32:00",
      createdBy: "John Doe",
      supporters: 234,
      comments: [
        {
          id: 1,
          text: "I damaged my tire last week!",
          author: "Sarah Johnson",
          date: "2025-02-18T09:45:00"
        },
        {
          id: 2,
          text: "Road crews were inspecting yesterday.",
          author: "Mike Peters",
          date: "2025-02-22T16:20:00"
        }
      ]
    },
    {
      id: 2,
      title: "Improve street lighting in Central Park",
      description: "The lighting in Central Park is insufficient, making it unsafe at night.",
      department: "Infrastructure",
      priority: "Normal",
      status: "Pending",
      createdAt: "2025-03-01T10:15:00",
      createdBy: "Emily Chen",
      supporters: 156,
      comments: [
        {
          id: 1,
          text: "I avoid the park after sunset.",
          author: "Lisa Wong",
          date: "2025-03-02T18:30:00"
        }
      ]
    },
    {
      id: 3,
      title: "Update playground equipment at Jefferson Elementary",
      description: "The playground equipment is outdated and unsafe.",
      department: "Education",
      priority: "Normal",
      status: "Pending",
      createdAt: "2025-02-20T09:10:00",
      createdBy: "Robert Taylor",
      supporters: 87,
      comments: []
    },
    {
      id: 4,
      title: "Increase recycling bins downtown",
      description: "More recycling bins are needed to reduce waste.",
      department: "Environment",
      priority: "Normal",
      status: "Resolved",
      createdAt: "2025-01-12T11:25:00",
      createdBy: "Maria Garcia",
      supporters: 192,
      comments: [
        {
          id: 1,
          text: "New bins were installed yesterday!",
          author: "David Kim",
          date: "2025-02-08T14:15:00"
        }
      ]
    },
    {
      id: 5,
      title: "Address flooding on Riverside Drive",
      description: "Severe flooding makes Riverside Drive impassable during rain.",
      department: "Infrastructure",
      priority: "Urgent",
      status: "In Progress",
      createdAt: "2025-03-05T08:45:00",
      createdBy: "James Wilson",
      supporters: 312,
      comments: [
        {
          id: 1,
          text: "My basement flooded last month!",
          author: "Karen Miller",
          date: "2025-03-06T10:20:00"
        },
        {
          id: 2,
          text: "Engineers assessed it this morning.",
          author: "Tom Jackson",
          date: "2025-03-12T15:40:00"
        }
      ]
    },
    {
      id: 6,
      title: "Extended hours for community health clinic",
      description: "Current clinic hours are inconvenient for workers.",
      department: "Healthcare",
      priority: "High",
      status: "Pending",
      createdAt: "2025-02-28T16:30:00",
      createdBy: "Susan Brown",
      supporters: 175,
      comments: [
        {
          id: 1,
          text: "This would help so much!",
          author: "Jennifer Adams",
          date: "2025-03-02T19:15:00"
        }
      ]
    }
  ];
  
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
    petitions: 2,
    supported: 5
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    if (path.includes('login.html') || path.endsWith('/') || path.endsWith('index.html')) {
      initLoginPage();
    } else if (path.includes('dashboard.html')) {
      initDashboardPage();
    }
  });
  
  function initLoginPage() {
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('demoLogin')?.addEventListener('click', useDemoAccount);
    document.getElementById('togglePassword')?.addEventListener('click', () => {
      const passwordInput = document.getElementById('password');
      const type = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = type;
      document.getElementById('togglePassword').innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
  }
  
  function handleLogin(e) {
    e.preventDefault();
    const loginToast = new bootstrap.Toast(document.getElementById('loginToast'));
    loginToast.show();
    setTimeout(() => window.location.href = 'dashboard.html', 2000);
  }
  
  function useDemoAccount() {
    document.getElementById('email').value = 'demo@example.com';
    document.getElementById('password').value = 'password123';
  }
  
  function initDashboardPage() {
    updateUserProfileData();
    setupEventListeners();
    loadPetitions();
    updatePagination(petitionsData.length, 1);
    updateStatistics();
    setTimeout(() => showNotification("Welcome back, John! You have 3 new petition updates."), 1500);
  }
  
  function updateStatistics() {
    const totalPetitions = petitionsData.length;
    const resolvedPetitions = petitionsData.filter(p => p.status === 'Resolved').length;
    const pendingPetitions = petitionsData.filter(p => p.status === 'Pending').length;
    const inProgressPetitions = petitionsData.filter(p => p.status === 'In Progress').length;
  
    document.getElementById('totalPetitions').textContent = totalPetitions;
    document.getElementById('resolvedPetitions').textContent = resolvedPetitions;
    document.getElementById('pendingPetitions').textContent = pendingPetitions;
    document.getElementById('inProgressPetitions').textContent = inProgressPetitions;
  }
  
  function setupEventListeners() {
    document.getElementById('statsToggle')?.addEventListener('click', () => 
      document.getElementById('statisticsPanel').classList.toggle('d-none')
    );
    
    document.getElementById('closeStats')?.addEventListener('click', () => 
      document.getElementById('statisticsPanel').classList.add('d-none')
    );
  
    ['search', 'filterStatus', 'filterDepartment', 'filterPriority', 'sort'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', applyFilters);
    });
  
    document.getElementById('clearFilters')?.addEventListener('click', () => {
      ['search', 'filterStatus', 'filterDepartment', 'filterPriority'].forEach(id => 
        document.getElementById(id).value = ''
      );
      document.getElementById('sort').value = 'date-desc';
      applyFilters();
    });
  
    document.getElementById('submitPetition')?.addEventListener('click', createNewPetition);
    document.getElementById('logout')?.addEventListener('click', () => window.location.href = 'index.html');
    document.getElementById('supportButton')?.addEventListener('click', toggleSupport);
    document.getElementById('commentForm')?.addEventListener('submit', addComment);
    document.getElementById('shareButton')?.addEventListener('click', sharePetition);
  }
  
  function updateUserProfileData() {
    document.getElementById('userInitials').textContent = userData.initials;
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('profileInitials').textContent = userData.initials;
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('userPetitionCount').textContent = userData.petitions;
    document.getElementById('userSupportCount').textContent = userData.supported;
  }
  
  function loadPetitions(page = 1, itemsPerPage = 6) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const petitionList = document.getElementById('petitionList');
    const noResults = document.getElementById('noResults');
  
    loadingIndicator.classList.remove('d-none');
    petitionList.innerHTML = '';
  
    setTimeout(() => {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = petitionsData.slice(startIndex, endIndex);
  
      if (paginatedData.length === 0) {
        noResults.classList.remove('d-none');
      } else {
        noResults.classList.add('d-none');
        paginatedData.forEach(petition => petitionList.appendChild(createPetitionCard(petition)));
      }
  
      loadingIndicator.classList.add('d-none');
      updatePagination(petitionsData.length, page, itemsPerPage);
    }, 800);
  }
  
  function createPetitionCard(petition) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4 fade-in';
  
    const statusClass = {
      'Pending': 'pending',
      'In Progress': 'progress',
      'Resolved': 'resolved'
    }[petition.status];
    
    const priorityClass = {
      'Urgent': 'priority-urgent',
      'High': 'priority-high',
      'Normal': 'priority-normal'
    }[petition.priority];
    
    const createdDate = new Date(petition.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  
    col.innerHTML = `
      <div class="card petition-card shadow-sm ${priorityClass}" tabindex="0">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>${petition.title}</div>
          <span class="status-badge ${statusClass}">${petition.status}</span>
        </div>
        <div class="card-body">
          <p class="card-text">${petition.description.substring(0, 120)}${petition.description.length > 120 ? '...' : ''}</p>
          <div class="petition-info mb-2">
            <div><i class="fas fa-building"></i> ${petition.department}</div>
            <div><i class="fas fa-flag"></i> ${petition.priority} Priority</div>
          </div>
          <div class="progress mt-3" style="height: 8px;">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${Math.min(100, (petition.supporters / 100) * 100)}%"></div>
          </div>
          <div class="d-flex justify-content-between mt-1">
            <small>${petition.supporters} supporters</small>
            <small>${petition.comments.length} comments</small>
          </div>
        </div>
        <div class="petition-footer">
          <div class="petition-meta">
            <div><i class="fas fa-calendar-alt me-1"></i> ${createdDate}</div>
            <div><i class="fas fa-user me-1"></i> ${petition.createdBy}</div>
          </div>
        </div>
        <button class="btn btn-light w-100 border-top rounded-0" onclick="openPetitionDetails(${petition.id})">
          <i class="fas fa-eye me-1"></i>View Details
        </button>
      </div>
    `;
  
    col.querySelector('.petition-card').addEventListener('keydown', e => 
      e.key === 'Enter' && openPetitionDetails(petition.id)
    );
    
    return col;
  }
  
  function openPetitionDetails(petitionId) {
    const petition = petitionsData.find(p => p.id === petitionId);
    if (!petition) return;
  
    const createdDate = new Date(petition.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  
    document.getElementById('modalTitle').textContent = petition.title;
    document.getElementById('modalContent').innerHTML = `
      <div class="petition-status mb-3">
        <span class="status-badge ${petition.status === 'Pending' ? 'pending' : petition.status === 'In Progress' ? 'progress' : 'resolved'}">${petition.status}</span>
        <span class="ms-2 badge bg-${petition.priority === 'Urgent' ? 'danger' : petition.priority === 'High' ? 'warning' : 'success'}">${petition.priority} Priority</span>
      </div>
      <p class="petition-description">${petition.description}</p>
      <div class="progress mt-4 mb-2" style="height: 10px;">
        <div class="progress-bar bg-success" role="progressbar" style="width: ${Math.min(100, (petition.supporters / 500) * 100)}%" aria-valuenow="${petition.supporters}" aria-valuemin="0" aria-valuemax="500"></div>
      </div>
      <div class="d-flex justify-content-between mb-4">
        <small>${petition.supporters} supporters</small>
        <small>Goal: 500 supporters</small>
      </div>
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="petition-info mb-2">
            <div><i class="fas fa-building me-2"></i> Department: ${petition.department}</div>
            <div><i class="fas fa-calendar-alt me-2"></i> Created: ${createdDate}</div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="petition-info mb-2">
            <div><i class="fas fa-user me-2"></i> Created by: ${petition.createdBy}</div>
            <div><i class="fas fa-comments me-2"></i> Comments: ${petition.comments.length}</div>
          </div>
        </div>
      </div>
    `;
  
    document.getElementById('supportCount').textContent = petition.supporters;
    
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = petition.comments.length === 0 
      ? '<p class="text-muted">No comments yet. Be the first to comment!</p>' 
      : petition.comments.map(comment => `
        <div class="comment-item">
          <div class="d-flex justify-content-between">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${new Date(comment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          </div>
          <div class="comment-text">${comment.text}</div>
        </div>
      `).join('');
  
    document.getElementById('commentCount').textContent = petition.comments.length;
    document.getElementById('petitionModal').dataset.petitionId = petitionId;
  
    // Reset support button state
    const supportButton = document.getElementById('supportButton');
    supportButton.disabled = false;
    supportButton.innerHTML = `
      <i class="fas fa-thumbs-up me-1"></i>Support this petition
      <span id="supportCount" class="badge bg-light text-dark ms-1">${petition.supporters}</span>
    `;
  
    new bootstrap.Modal(document.getElementById('petitionModal')).show();
  }
  
  function toggleSupport() {
    const petitionId = parseInt(document.getElementById('petitionModal').dataset.petitionId);
    const petition = petitionsData.find(p => p.id === petitionId);
  
    petition.supporters += 1;
    document.getElementById('supportCount').textContent = petition.supporters;
    document.querySelector('#modalContent .progress-bar').style.width = `${Math.min(100, (petition.supporters / 500) * 100)}%`;
    document.querySelector('#modalContent .d-flex small:first-child').textContent = `${petition.supporters} supporters`;
    showNotification('Thank you for supporting this petition!');
  
    userData.supported += 1;
    document.getElementById('userSupportCount').textContent = userData.supported;
  
    const supportButton = document.getElementById('supportButton');
    supportButton.disabled = true;
    supportButton.innerHTML = `
      <i class="fas fa-check me-1"></i>Supported 
      <span id="supportCount" class="badge bg-primary">${petition.supporters}</span>
    `;
  }
  
  function addComment(e) {
    e.preventDefault();
    const commentText = document.getElementById('commentText').value.trim();
    if (!commentText) return;
  
    const petitionId = parseInt(document.getElementById('petitionModal').dataset.petitionId);
    const petition = petitionsData.find(p => p.id === petitionId);
  
    const newComment = {
      id: petition.comments.length + 1,
      text: commentText,
      author: userData.name,
      date: new Date().toISOString()
    };
    
    petition.comments.push(newComment);
  
    const commentsList = document.getElementById('commentsList');
    if (commentsList.querySelector('p.text-muted')) commentsList.innerHTML = '';
    
    commentsList.innerHTML += `
      <div class="comment-item">
        <div class="d-flex justify-content-between">
          <span class="comment-author">${newComment.author}</span>
          <span class="comment-date">${new Date(newComment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        <div class="comment-text">${newComment.text}</div>
      </div>
    `;
  
    document.getElementById('commentCount').textContent = petition.comments.length;
    document.querySelector('#modalContent .petition-info div:last-child').innerHTML = `
      <i class="fas fa-comments me-2"></i>Comments: ${petition.comments.length}
    `;
    
    document.getElementById('commentText').value = '';
    showNotification('Your comment has been added!');
  }
  
  function createNewPetition() {
    const title = document.getElementById('petitionTitle').value;
    const description = document.getElementById('petitionDescription').value;
    const department = document.getElementById('petitionDepartment').value;
    const priority = document.getElementById('petitionPriority').value;
  
    if (!title || !description || !department) {
      showNotification('Please fill out all required fields', 'danger');
      return;
    }
  
    const newPetition = {
      id: petitionsData.length + 1,
      title,
      description,
      department,
      priority,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      createdBy: userData.name,
      supporters: 1,
      comments: []
    };
    
    petitionsData.unshift(newPetition);
  
    userData.petitions += 1;
    document.getElementById('userPetitionCount').textContent = userData.petitions;
  
    bootstrap.Modal.getInstance(document.getElementById('newPetitionModal')).hide();
    document.getElementById('newPetitionForm').reset();
    loadPetitions();
    updateStatistics();
    showNotification('Your petition has been created successfully!');
  }
  
  function applyFilters() {
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';
    const departmentFilter = document.getElementById('filterDepartment')?.value || '';
    const priorityFilter = document.getElementById('filterPriority')?.value || '';
    const sortOption = document.getElementById('sort')?.value || 'date-desc';
  
    let filteredPetitions = [...petitionsData];
  
    if (searchTerm) {
      filteredPetitions = filteredPetitions.filter(p => 
        p.title.toLowerCase().includes(searchTerm) || 
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    
    if (statusFilter) {
      filteredPetitions = filteredPetitions.filter(p => p.status === statusFilter);
    }
    
    if (departmentFilter) {
      filteredPetitions = filteredPetitions.filter(p => p.department === departmentFilter);
    }
    
    if (priorityFilter) {
      filteredPetitions = filteredPetitions.filter(p => p.priority === priorityFilter);
    }
  
    switch (sortOption) {
      case 'date-desc':
        filteredPetitions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'date-asc':
        filteredPetitions.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'supporters':
        filteredPetitions.sort((a, b) => b.supporters - a.supporters);
        break;
      case 'priority':
        filteredPetitions.sort((a, b) => 
          ({ 'Urgent': 3, 'High': 2, 'Normal': 1 })[b.priority] - 
          ({ 'Urgent': 3, 'High': 2, 'Normal': 1 })[a.priority]
        );
        break;
    }
  
    window.filteredPetitionsData = filteredPetitions;
  
    const loadingIndicator = document.getElementById('loadingIndicator');
    const petitionList = document.getElementById('petitionList');
    const noResults = document.getElementById('noResults');
  
    loadingIndicator.classList.remove('d-none');
    petitionList.innerHTML = '';
  
    setTimeout(() => {
      if (filteredPetitions.length === 0) {
        noResults.classList.remove('d-none');
      } else {
        noResults.classList.add('d-none');
        filteredPetitions.slice(0, 6).forEach(petition => 
          petitionList.appendChild(createPetitionCard(petition))
        );
      }
      
      updatePagination(filteredPetitions.length, 1);
      loadingIndicator.classList.add('d-none');
    }, 600);
  }
  
  function updatePagination(totalItems, currentPage, itemsPerPage = 6) {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    if (totalPages <= 1) {
      pagination.innerHTML = '';
      return;
    }
  
    let paginationHTML = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${currentPage - 1}" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `;
  
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
  
    if (startPage > 1) {
      paginationHTML += `<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>`;
      if (startPage > 2) {
        paginationHTML += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      paginationHTML += `
        <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }
  
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        paginationHTML += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
      }
      paginationHTML += `
        <li class="page-item">
          <a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a>
        </li>
      `;
    }
  
    paginationHTML += `
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage + 1}" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;

  pagination.innerHTML = paginationHTML;

  // Add click event listeners to pagination buttons
  pagination.querySelectorAll('.page-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageNum = parseInt(e.target.closest('.page-link').dataset.page);
      if (!isNaN(pageNum)) {
        loadPetitions(pageNum);
      }
    });
  });
}